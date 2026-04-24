package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.RouteCreationRequest;
import com.smart_school_bus.SSB.dto.request.RouteUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.RouteResponse;
import com.smart_school_bus.SSB.service.RouteService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.security.UnresolvedPermission;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/route")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RouteController {
    RouteService routeService;

    @PostMapping
    public ApiResponse createRoute(@Valid @RequestBody RouteCreationRequest request) {
        RouteResponse data = routeService.createRoute(request);

        ApiResponse response = ApiResponse.<RouteResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create route successfully")
                .build();

        return response;
    }

    @GetMapping
    public ApiResponse<List<RouteResponse>> getAllRoutes() {
        List<RouteResponse> data = routeService.getAllRoutes();
        return ApiResponse.<List<RouteResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get all routes successfully")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<RouteResponse> getRouteById(@PathVariable String id) {
        RouteResponse data = routeService.getRouteById(id);
        return ApiResponse.<RouteResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get route successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<RouteResponse> updateRoute(@PathVariable String id, @Valid @RequestBody RouteUpdateRequest request) {
        RouteResponse data = routeService.updateRoute(id, request);
        return ApiResponse.<RouteResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Update route successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteRoute(@PathVariable String id) {
        routeService.deleteRoute(id);
        return ApiResponse.<Void>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Delete route successfully")
                .build();
    }
}
