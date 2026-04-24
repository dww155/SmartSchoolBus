package com.smart_school_bus.SSB.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentResponse {
    String id;
    String firstName;
    String lastName;
    LocalDate dob;
    String gender;
    String address;
    String classRoom;
    String imageUrl;
    LocalDateTime createdAt;
    Set<ScheduleWithoutStudentsResponse> schedules;
}
