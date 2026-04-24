package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.authentication.AuthRequest;
import com.smart_school_bus.SSB.dto.request.authentication.IntrospectRequest;
import com.smart_school_bus.SSB.dto.request.authentication.LogoutRequest;
import com.smart_school_bus.SSB.dto.request.authentication.RefreshRequest;
import com.smart_school_bus.SSB.dto.response.AuthResponse;
import com.smart_school_bus.SSB.dto.response.IntrospectResponse;
import com.smart_school_bus.SSB.entity.Permission;
import com.smart_school_bus.SSB.entity.Role;
import com.smart_school_bus.SSB.entity.User;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.repository.InvalidatedTokenRepository;
import com.smart_school_bus.SSB.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
@TestPropertySource("/test.properties")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ActiveProfiles("test")
public class AuthServiceTest {

    @Autowired
    AuthService authService;

    @MockitoBean
    UserRepository userRepository;

    @MockitoBean
    InvalidatedTokenRepository invalidatedTokenRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    AuthRequest authRequest;
    User user;

    @BeforeEach
    public void initData() {
        user = User.builder()
                .userName("0909123456")
                .password(passwordEncoder.encode("RawPassword"))
                .email("nguyenvana@gmail.com")
                .phoneNumber("0909123456")
                .firstName("Văn")
                .lastName("Nguyễn A")
                .dob(LocalDate.of(2000, 5, 12))
                .address("123 Đường Lê Lợi, Quận 1, TP.HCM")
                .gender("male")
                .imageUrl("https://example.com/avatar/nguyenvana.jpg")
                .roles(Set.of(
                        Role.builder()
                                .name("USER")
                                .description("test role")
                                .permissions(Set.of(Permission.builder().name("READ").build()))
                                .build()
                ))
                .activate(true)
                .createdAt(LocalDateTime.now())
                .build();

        authRequest = AuthRequest.builder()
                .userName("0909123456")
                .password("RawPassword")
                .build();
    }

    @Test
    public void authenticate_success() {
        Mockito.when(userRepository.findByUserName(any())).thenReturn(Optional.of(user));

        AuthResponse response = authService.authenticate(authRequest);

        assertTrue(response.isAuthenticated());
        assertNotNull(response.getResult());
    }

    @Test
    public void authenticate_fail_wrongPassword() {
        authRequest.setPassword("WrongPassword");
        Mockito.when(userRepository.findByUserName(any())).thenReturn(Optional.of(user));

        assertThrows(AppException.class, () -> authService.authenticate(authRequest));
    }

    @Test
    public void refreshToken_success() throws Exception {
        Mockito.when(userRepository.findByUserName(any())).thenReturn(Optional.of(user));
        Mockito.when(invalidatedTokenRepository.existsById(any())).thenReturn(false);

        AuthResponse initial = authService.authenticate(authRequest);
        RefreshRequest refreshRequest = RefreshRequest.builder().token(initial.getResult()).build();

        AuthResponse refreshed = authService.refreshToken(refreshRequest);

        assertTrue(refreshed.isAuthenticated());
        assertNotEquals(initial.getResult(), refreshed.getResult());
    }

    @Test
    public void logout_success() throws Exception {
        Mockito.when(userRepository.findByUserName(any())).thenReturn(Optional.of(user));
        Mockito.when(invalidatedTokenRepository.existsById(any())).thenReturn(false);

        AuthResponse response = authService.authenticate(authRequest);
        LogoutRequest logoutRequest = LogoutRequest.builder().token(response.getResult()).build();

        authService.logout(logoutRequest);

        Mockito.verify(invalidatedTokenRepository, Mockito.times(1)).save(any());
    }

    @Test
    public void introspect_validToken() throws Exception {
        Mockito.when(userRepository.findByUserName(any())).thenReturn(Optional.of(user));
        Mockito.when(invalidatedTokenRepository.existsById(any())).thenReturn(false);

        AuthResponse response = authService.authenticate(authRequest);
        IntrospectRequest request = IntrospectRequest.builder().token(response.getResult()).build();

        IntrospectResponse introspect = authService.introspect(request);

        assertTrue(introspect.isValid());
    }
}
