package com.smart_school_bus.SSB.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String phoneNumber;
    String userName;
    String firstName;
    String lastName;
    LocalDate dob;
    String address;
    LocalDate createdAt;
    String email;
    String imageUrl;
}
