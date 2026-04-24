package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.ScheduleCreationRequest;
import com.smart_school_bus.SSB.dto.request.ScheduleUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.ScheduleResponse;
import com.smart_school_bus.SSB.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ScheduleController {
    ScheduleService scheduleService;

    @PostMapping
    public ApiResponse createSchedule(@Valid @RequestBody ScheduleCreationRequest request) {
        ScheduleResponse data = scheduleService.createSchedule(request);

        ApiResponse response = ApiResponse.<ScheduleResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create schedule successfully")
                .build();

        return response;
    }

    @GetMapping
    public ApiResponse<List<ScheduleResponse>> getSchedules() {
        List<ScheduleResponse> data = scheduleService.getSchedules();

        return ApiResponse.<List<ScheduleResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Get schedules successfully")
                .data(data)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ScheduleResponse> getScheduleById(@PathVariable String id) {
        ScheduleResponse data = scheduleService.getSchedule(id);

        return ApiResponse.<ScheduleResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Get schedule successfully")
                .data(data)
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<ScheduleResponse> updateSchedule(@PathVariable String id, @Valid @RequestBody ScheduleUpdateRequest request) {

        ScheduleResponse data = scheduleService.updateSchedule(id, request);

        return ApiResponse.<ScheduleResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Update schedule successfully")
                .data(data)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteSchedule(@PathVariable String id) {
        scheduleService.deleteSchedule(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Delete schedule successfully")
                .build();
    }
}
