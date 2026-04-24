package com.smart_school_bus.SSB.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentWithoutSchedulesResponse {
    String id;
    String firstName;
    String lastName;
    LocalDate dob;
    String address;
    String classRoom;
    String imageUrl;
    ParentResponse parent;
}
