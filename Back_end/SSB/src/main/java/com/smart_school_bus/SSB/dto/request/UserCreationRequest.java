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
public class UserCreationRequest {
    @NotNull(message = "INVALID_PHONE_NUMBER")
    @Pattern(regexp = "^0\\d{9}$", message = "INVALID_PHONE_NUMBER")
    String phoneNumber;

    @Email(message = "INVALID_EMAIL")
    String email;

    @NotNull(message = "INVALID_FIRST_NAME")
    String firstName;

    @Size(max = 50, message = "INVALID_LAST_NAME_LENGTH")
    String lastName;

    @DobConstraint(min = 16, message = "INVALID_DOB")
    LocalDate dob;

    @Size(max = 255, message = "INVALID_ADDRESS_LENGTH")
    String address;

    Set<String> roleNames;

    @NotNull(message = "INVALID_GENDER")
    @GenderConstraint
    String gender;

    @NotBlank(message = "INVALID_IMAGE_URL")
    String imageUrl;
}
