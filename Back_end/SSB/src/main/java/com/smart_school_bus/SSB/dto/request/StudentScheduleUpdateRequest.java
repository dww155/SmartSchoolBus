package com.smart_school_bus.SSB.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentScheduleUpdateRequest {
    @NotNull(message = "SCHEDULE_NOT_FOUND")
    Set<String> scheduleIds;
}
