package com.smart_school_bus.SSB.controller;

import com.nimbusds.jose.JOSEException;
import com.smart_school_bus.SSB.dto.request.authentication.AuthRequest;
import com.smart_school_bus.SSB.dto.request.authentication.IntrospectRequest;
import com.smart_school_bus.SSB.dto.request.authentication.LogoutRequest;
import com.smart_school_bus.SSB.dto.request.authentication.RefreshRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.AuthResponse;
import com.smart_school_bus.SSB.dto.response.IntrospectResponse;
import com.smart_school_bus.SSB.service.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.time.Instant;

@Slf4j
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    AuthService authService;

    @PostMapping("/login")
    public ApiResponse authenticate(@RequestBody AuthRequest request) {
        AuthResponse data = authService.authenticate(request);
        ApiResponse respond = ApiResponse.<AuthResponse>builder()
                .success(true)
                .status(1000)
                .message("Check login successfully")
                .data(data)
                .timestamp(Instant.now())
                .build();
        return respond;
    }

    @PostMapping("/introspect")
    public ApiResponse introSpect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        authentication.getAuthorities().forEach(grantedAuthority -> {
            System.out.println(grantedAuthority.getAuthority());
        });

        IntrospectResponse respond = authService.introspect(request);

        return ApiResponse.<IntrospectResponse>builder()
                .success(true)
                .status(1000)
                .message("Verify token successfully")
                .data(respond)
                .timestamp(Instant.now())
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authService.logout(request);

        return ApiResponse.builder()
                .success(true)
                .status(1000)
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse refresh(@RequestBody RefreshRequest request) throws ParseException, JOSEException {
        AuthResponse response = authService.refreshToken(request);

        return ApiResponse.<AuthResponse>builder()
                .success(true)
                .status(1000)
                .message("Refresh successfully")
                .data(response)
                .timestamp(Instant.now())
                .build();
    }
}
