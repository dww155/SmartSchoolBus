package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.BusStopCreationRequest;
import com.smart_school_bus.SSB.dto.request.BusStopUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.BusStopResponse;
import com.smart_school_bus.SSB.service.BusStopService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/bus-stop")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BusStopController {
    BusStopService busStopService;

    @PostMapping
    public ApiResponse<BusStopResponse> createBusStop(@Valid @RequestBody BusStopCreationRequest request) {
        BusStopResponse data = busStopService.createBusStop(request);

        return ApiResponse.<BusStopResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create bus stop successfully")
                .build();
    }

    @GetMapping
    public ApiResponse<List<BusStopResponse>> getBusStops() {
        List<BusStopResponse> data = busStopService.getBusStops();

        return ApiResponse.<List<BusStopResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get all bus stops successfully")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BusStopResponse> getBusStop(@PathVariable String id) {
        BusStopResponse data = busStopService.getBusStop(id);

        return ApiResponse.<BusStopResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get bus stop successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<BusStopResponse> updateBusStop(@Valid @RequestBody BusStopUpdateRequest request, @PathVariable String id) {
        BusStopResponse data = busStopService.updateBusStop(id, request);

        return ApiResponse.<BusStopResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Update bus stop successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteBusStop(@PathVariable String id) {
        busStopService.deleteBusStop(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Delete bus stop successfully")
                .build();
    }
}
