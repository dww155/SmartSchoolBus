package com.smart_school_bus.SSB.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DriverResponseWithSchedules {
    String id;
    String driverLicense;
    UserResponse user;
    Set<ScheduleResponse> schedules;
}
