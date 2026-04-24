package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.BusLocationCreationRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.BusLocationResponse;
import com.smart_school_bus.SSB.service.BusLocationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/gps")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BusLocationController {
    BusLocationService busLocationService;

    @PostMapping
    public ApiResponse createBusLocation(@Valid @RequestBody BusLocationCreationRequest request) {
        BusLocationResponse data = busLocationService.createBusLocation(request);

        ApiResponse response = ApiResponse.<BusLocationResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create gpt ping successfully")
                .build();

        return response;
    }

    @GetMapping
    public ApiResponse getLocations() {
        List<BusLocationResponse> data = busLocationService.getBusLocations();

        ApiResponse response = ApiResponse.<List<BusLocationResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("get all gps ping successfully")
                .build();

        return response;
    }

    @GetMapping("/{id}")
    public ApiResponse getBusLocations(@PathVariable String busId) {
        List<BusLocationResponse> data = busLocationService.getBusLocationsByBus(busId);

        ApiResponse response = ApiResponse.<List<BusLocationResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("get gps ping successfully")
                .build();

        return response;
    }
}
