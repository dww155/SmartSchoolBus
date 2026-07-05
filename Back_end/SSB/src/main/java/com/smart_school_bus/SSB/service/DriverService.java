package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.constant.PredefinedRoles;
import com.smart_school_bus.SSB.dto.request.DriverAndUserCreationRequest;
import com.smart_school_bus.SSB.dto.request.DriverCreationRequest;
import com.smart_school_bus.SSB.dto.request.DriverUpdateRequest;
import com.smart_school_bus.SSB.dto.request.UserCreationRequest;
import com.smart_school_bus.SSB.dto.response.DriverResponse;
import com.smart_school_bus.SSB.dto.response.DriverResponseWithSchedules;
import com.smart_school_bus.SSB.dto.response.UserResponse;
import com.smart_school_bus.SSB.entity.Driver;
import com.smart_school_bus.SSB.entity.User;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.mapper.DriverMapper;
import com.smart_school_bus.SSB.repository.DriverRepository;
import com.smart_school_bus.SSB.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DriverService {
    DriverRepository driverRepository;
    UserRepository userRepository;
    DriverMapper driverMapper;
    UserService userService;

    @Transactional
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public DriverResponse createDriver(DriverCreationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        Driver driver = driverMapper.toDriver(request);
        driver.setUser(user);

        Driver driverFromRepository = driverRepository.save(driver);
        user.setDriver(driverFromRepository);

        return driverMapper.toResponse(driverFromRepository);
    }

    @Transactional
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public DriverResponse createDriverWithUser(DriverAndUserCreationRequest request) {
        UserCreationRequest userCreationRequest = request.getUser();
        userCreationRequest.setRoleNames(new HashSet<>(Set.of(PredefinedRoles.DRIVER_ROLE)));
        UserResponse userResponse = userService.createUser(userCreationRequest);

        DriverCreationRequest driverCreationRequest = DriverCreationRequest.builder()
                .userId(userResponse.getId())
                .driverLicense(request.getDriverLicense())
                .build();

        return createDriver(driverCreationRequest);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<DriverResponse> getDrivers() {
        return driverRepository.findAll()
                .stream()
                .map(driverMapper::toResponse)
                .toList();
    }

    public DriverResponse getDriver(String id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_FOUND));

        return driverMapper.toResponse(driver);
    }

    public DriverResponseWithSchedules getMyInfo() {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();

        Driver driver = driverRepository.findByUser_UserName(userName)
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_FOUND));

        return driverMapper.toResponseWithSchedules(driver);
    }

    public DriverResponse updateDriver(String id, DriverUpdateRequest request) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_FOUND));

        driverMapper.updateDriver(driver, request);

        return driverMapper.toResponse(driverRepository.save(driver));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteDriver(String id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_FOUND));

        driverRepository.delete(driver);
    }
}
