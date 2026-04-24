package com.smart_school_bus.SSB.dto.request;

import com.smart_school_bus.SSB.validator.DobConstraint;
import com.smart_school_bus.SSB.validator.GenderConstraint;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequest {
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,64}$",
            message = "INVALID_PASSWORD"
    )
    String password;

    @Size(max = 50, message = "INVALID_FIRST_NAME_LENGTH")
    String firstName;

    @Size(max = 50, message = "INVALID_LAST_NAME_LENGTH")
    String lastName;

    @DobConstraint(min = 16, message = "INVALID_DOB")
    @Past(message = "INVALID_DOB")
    LocalDate dob;

    @Size(max = 255, message = "INVALID_ADDRESS_LENGTH")
    String address;

    Set<@NotBlank(message = "INVALID_ROLE") String> roleNames;

    Boolean active;

    @GenderConstraint
    String gender;
}
