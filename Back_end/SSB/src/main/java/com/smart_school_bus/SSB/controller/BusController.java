package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.BusCreationRequest;
import com.smart_school_bus.SSB.dto.request.BusUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.BusResponse;
import com.smart_school_bus.SSB.service.BusService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/bus")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BusController {
    BusService busService;

    @PostMapping
    public ApiResponse<BusResponse> createBus(@Valid @RequestBody BusCreationRequest request) {
        BusResponse data = busService.createBus(request);

        ApiResponse response = ApiResponse.<BusResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create bus successfully")
                .build();

        return response;
    }

    @GetMapping
    public ApiResponse<List<BusResponse>> getBuses() {
        List<BusResponse> data = busService.getBuses();

        return ApiResponse.<List<BusResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get all buses successfully")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BusResponse> getBus(@PathVariable String id) {
        BusResponse data = busService.getBus(id);

        return ApiResponse.<BusResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get bus successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<BusResponse> updateBus(@Valid @RequestBody BusUpdateRequest request, @PathVariable String id) {
        BusResponse data = busService.updateBus(request, id);

        return ApiResponse.<BusResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Update bus successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteBus(@PathVariable String id) {
        busService.deleteBus(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Delete bus successfully")
                .build();
    }
}
