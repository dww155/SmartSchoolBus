package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.DriverAndUserCreationRequest;
import com.smart_school_bus.SSB.dto.request.DriverCreationRequest;
import com.smart_school_bus.SSB.dto.request.DriverUpdateRequest;
import com.smart_school_bus.SSB.dto.request.UserCreationRequest;
import com.smart_school_bus.SSB.dto.response.DriverResponse;
import com.smart_school_bus.SSB.dto.response.UserResponse;
import com.smart_school_bus.SSB.entity.Driver;
import com.smart_school_bus.SSB.entity.User;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.repository.DriverRepository;
import com.smart_school_bus.SSB.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@FieldDefaults(level = AccessLevel.PRIVATE)
@TestPropertySource("/test.properties")
public class DriverServiceTest {
    @MockitoBean
    DriverRepository driverRepository;

    @MockitoBean
    UserRepository userRepository;

    @Autowired
    DriverService driverService;

    @MockitoBean
    UserService userService;

    DriverAndUserCreationRequest driverAndUserCreationRequest;
    DriverCreationRequest driverCreationRequest;
    DriverUpdateRequest driverUpdateRequest;
    Driver driver;
    DriverResponse driverResponse;
    UserCreationRequest userCreationRequest;
    User user;
    UserResponse userResponse;

    @BeforeEach
    public void initData() {
        user = User.builder()
                .id("User test id")
                .address("User test address")
                .roles(null)
                .dob(LocalDate.of(2005, 2, 17))
                .build();

        driverCreationRequest = DriverCreationRequest.builder()
                .driverLicense("123456789101")
                .userId("User test id")
                .build();

        driver = Driver.builder()
                .driverLicense("123456789101")
                .user(user)
                .build();

        userCreationRequest = UserCreationRequest.builder()
                .firstName("Dư")
                .lastName("Trần")
                .dob(LocalDate.of(2005, 2, 17))
                .address("123 Nguyễn Văn Cừ, Quận 5, TP.HCM")
                .email("du.tran@example.com")
                .phoneNumber("0912345678")
                .gender("Nam")
                .imageUrl("https://example.com/images/users/du_tran01.jpg")
                .build();

        driverAndUserCreationRequest = DriverAndUserCreationRequest.builder()
                .user(userCreationRequest)
                .driverLicense("123456789101")
                .build();

        userResponse = UserResponse.builder()
                .id("user-001")
                .phoneNumber("0912345678")
                .userName("du_tran01")
                .firstName("Dư")
                .lastName("Trần")
                .dob(LocalDate.of(2005, 2, 17))
                .address("123 Nguyễn Văn Cừ, Quận 5, TP.HCM")
                .createdAt(LocalDate.of(2025, 10, 10))
                .build();
    }

    @Test
    @WithMockUser(username = "ADMIN", roles = {"ADMIN"})
    public void createDriver_success() {
        when(userRepository.findById(any())).thenReturn(Optional.ofNullable(user));
        when(driverRepository.save(any())).thenReturn(driver);

        DriverResponse response = driverService.createDriver(driverCreationRequest);

        assertEquals("123456789101", response.getDriverLicense());
        verify(driverRepository, times(1)).save(any());
    }

    @Test
    @WithMockUser(username = "ADMIN", roles = {"ADMIN"})
    public void createDriver_userNotFound_throwException() {
        when(userRepository.findById("User test id")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> driverService.createDriver(driverCreationRequest));

        assertEquals(ErrorCode.USER_NOT_FOUND, ex.getErrorCode());
    }

    @Test
    @WithMockUser(username = "ADMIN", roles = {"ADMIN"})
    public void createDriverWithUser_success() {
        when(userService.createUser(any())).thenReturn(userResponse);
        when(userRepository.findById(any())).thenReturn(Optional.ofNullable(user));
        when(driverRepository.save(any())).thenReturn(driver);

        DriverResponse response = driverService.createDriverWithUser(driverAndUserCreationRequest);

        assertEquals("123456789101", response.getDriverLicense());
    }


    // --- GET ALL DRIVERS ---
    @Test
    @WithMockUser(username = "ADMIN", roles = {"ADMIN"})
    public void getDrivers_success() {
        when(driverRepository.findAll()).thenReturn(List.of(driver));

        List<DriverResponse> responses = driverService.getDrivers();

        assertEquals("123456789101", responses.get(0).getDriverLicense());
    }

    // --- GET DRIVER BY ID ---
    @Test
    public void getDriver_success() {
        when(driverRepository.findById("Driver test id")).thenReturn(Optional.of(driver));

        DriverResponse response = driverService.getDriver("Driver test id");

        assertEquals("123456789101", response.getDriverLicense());
    }

    @Test
    public void getDriver_notFound_throwException() {
        when(driverRepository.findById("invalid")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> driverService.getDriver("invalid"));

        assertEquals(ErrorCode.DRIVER_NOT_FOUND, ex.getErrorCode());
    }

    // --- UPDATE DRIVER ---
    @Test
    public void updateDriver_success() {
        when(driverRepository.findById("Driver test id")).thenReturn(Optional.of(driver));
        when(driverRepository.save(any())).thenReturn(driver);

        DriverResponse response = driverService.updateDriver("Driver test id", driverUpdateRequest);

        assertEquals("123456789101", response.getDriverLicense());
        verify(driverRepository, times(1)).save(any());
    }

    @Test
    public void updateDriver_notFound_throwException() {
        when(driverRepository.findById("invalid")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> driverService.updateDriver("invalid", driverUpdateRequest));

        assertEquals(ErrorCode.DRIVER_NOT_FOUND, ex.getErrorCode());
    }

    // --- DELETE DRIVER ---
    @Test
    @WithMockUser(username = "ADMIN", roles = {"ADMIN"})
    public void deleteDriver_success() {
        when(driverRepository.findById("Driver test id")).thenReturn(Optional.of(driver));

        driverService.deleteDriver("Driver test id");

        verify(driverRepository, times(1)).delete(driver);
    }

    @Test
    @WithMockUser(username = "ADMIN", roles = {"ADMIN"})
    public void deleteDriver_notFound_throwException() {
        when(driverRepository.findById("invalid")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> driverService.deleteDriver("invalid"));

        assertEquals(ErrorCode.DRIVER_NOT_FOUND, ex.getErrorCode());
    }
}
