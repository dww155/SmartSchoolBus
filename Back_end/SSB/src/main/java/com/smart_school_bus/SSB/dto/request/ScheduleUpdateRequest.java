package com.smart_school_bus.SSB.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScheduleUpdateRequest {
    @NotBlank(message = "INVALID_BUS_ID")
    String busId;

    @NotBlank(message = "INVALID_DRIVER_ID")
    String driverId;

    @NotBlank(message = "INVALID_ROUTE_ID")
    String routeId;

    @NotNull(message = "INVALID_DAY")
    DayOfWeek day;

    @NotNull(message = "INVALID_START_TIME")
    LocalTime startTime;
}
