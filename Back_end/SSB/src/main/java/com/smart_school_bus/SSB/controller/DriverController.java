package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.DriverAndUserCreationRequest;
import com.smart_school_bus.SSB.dto.request.DriverCreationRequest;
import com.smart_school_bus.SSB.dto.request.DriverUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.DriverResponse;
import com.smart_school_bus.SSB.dto.response.DriverResponseWithSchedules;
import com.smart_school_bus.SSB.service.DriverService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/driver")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DriverController {
    DriverService driverService;

    @PostMapping
    public ApiResponse createDriver(@Valid @RequestBody DriverCreationRequest request) {
        DriverResponse data = driverService.createDriver(request);

        return ApiResponse.<DriverResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create driver successfully")
                .build();
    }

    @PostMapping("/createUser")
    public ApiResponse createDriverWithUser(@Valid @RequestBody DriverAndUserCreationRequest request) {
        DriverResponse data = driverService.createDriverWithUser(request);

        return ApiResponse.<DriverResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create driver successfully")
                .build();
    }

    @GetMapping
    public ApiResponse getDrivers() {
        List<DriverResponse> data = driverService.getDrivers();

        return ApiResponse.<List<DriverResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get all drivers successfully")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse getDriver(@PathVariable("id") String id) {
        DriverResponse data = driverService.getDriver(id);

        return ApiResponse.<DriverResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get driver successfully")
                .build();
    }

    @GetMapping("/me")
    public ApiResponse getMyInfo() {
        DriverResponseWithSchedules data = driverService.getMyInfo();

        return ApiResponse.<DriverResponseWithSchedules>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get driver successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse updateDriver(@PathVariable String id, @Valid @RequestBody DriverUpdateRequest request) {
        DriverResponse data = driverService.updateDriver(id, request);

        return ApiResponse.<DriverResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Update driver successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse deleteDriver(@PathVariable String id) {
        driverService.deleteDriver(id);

        return ApiResponse.builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Delete driver successfully")
                .build();
    }
}
