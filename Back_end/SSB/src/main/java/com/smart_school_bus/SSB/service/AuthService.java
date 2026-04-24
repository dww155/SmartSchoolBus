package com.smart_school_bus.SSB.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.smart_school_bus.SSB.dto.request.authentication.AuthRequest;
import com.smart_school_bus.SSB.dto.request.authentication.IntrospectRequest;
import com.smart_school_bus.SSB.dto.request.authentication.LogoutRequest;
import com.smart_school_bus.SSB.dto.request.authentication.RefreshRequest;
import com.smart_school_bus.SSB.dto.response.AuthResponse;
import com.smart_school_bus.SSB.dto.response.IntrospectResponse;
import com.smart_school_bus.SSB.entity.InvalidatedToken;
import com.smart_school_bus.SSB.entity.User;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.repository.InvalidatedTokenRepository;
import com.smart_school_bus.SSB.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static java.rmi.server.LogStream.log;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
    InvalidatedTokenRepository invalidatedTokenRepository;

    @Value("${jwt.key}")
    @NonFinal
    protected String SIGNER_KEY;

    @Value("${jwt.expiration-time}")
    @NonFinal
    protected long EXPIRATION_TIME;

    @Value("${jwt.refreshExpiration-time}")
    @NonFinal
    protected long REFRESHABLE_UTIL;

    public AuthResponse authenticate(AuthRequest request) {
        User user = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        if(!(passwordEncoder.matches(request.getPassword(), user.getPassword()) && user.isActivate()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        String token = generateToken(user);

        AuthResponse respond = AuthResponse.builder()
                .result(token)
                .authenticated(true)
                .build();
        return respond;
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            String token = request.getToken();

            SignedJWT signedJWT = verifyToken(token, true);
            JWTClaimsSet jwtClaimsSet = signedJWT.getJWTClaimsSet();

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jwtClaimsSet.getJWTID())
                    .expiryTime(jwtClaimsSet.getExpirationTime())
                    .build();

            invalidatedTokenRepository.save(invalidatedToken);
        } catch (Exception e) {
            log(e.getMessage());
        }
    }

    public AuthResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        String token = request.getToken();

        SignedJWT signedJWT = verifyToken(token, true);
        JWTClaimsSet jwtClaimsSet = signedJWT.getJWTClaimsSet();

        logout(
                LogoutRequest.builder()
                        .token(token)
                        .build()
        );

        User user = userRepository.findByUserName(jwtClaimsSet.getSubject()).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );

        String newToken = generateToken(user);

        return AuthResponse.builder()
                .authenticated(true)
                .result(newToken)
                .build();
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        String token = request.getToken();

        boolean verified = true;
        try{
            verifyToken(token, false);
        } catch(AppException e) {
            verified = false;
        }

        return IntrospectResponse.builder()
                .valid(verified)
                .build();
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet claimSet = new JWTClaimsSet.Builder()
                .subject(user.getUserName())
                .claim("scope", buildScope(user))
                .jwtID(UUID.randomUUID().toString())
                .issuer("com.smart_school_bus.SSB")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(EXPIRATION_TIME, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .build();
        Payload payload = new Payload(claimSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            AuthService.log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        user.getRoles().forEach(role -> {
            stringJoiner.add("ROLE_" + role.getName());
            if (!role.getPermissions().isEmpty())
                role.getPermissions().forEach(permission -> {
                    stringJoiner.add("PERMISSION_" + permission.getName());
                });
        });

        return stringJoiner.toString();
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws ParseException, JOSEException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY);
        SignedJWT signedJWT = SignedJWT.parse(token);
        boolean verified = signedJWT.verify(verifier);

        Date expirationTime = isRefresh
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(REFRESHABLE_UTIL, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        if (!(verified && expirationTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }
}
