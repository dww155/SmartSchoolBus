package com.smart_school_bus.SSB.dto.request;

import com.smart_school_bus.SSB.validator.DobConstraint;
import com.smart_school_bus.SSB.validator.GenderConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StudentUpdateRequest {
    @NotBlank(message = "INVALID_FIRST_NAME")
    String firstName;

    @NotBlank(message = "INVALID_LAST_NAME")
    String lastName;

    @NotNull(message = "INVALID_DOB")
    @DobConstraint(min = 7)
    LocalDate dob;

    @NotNull(message = "INVALID_GENDER")
    @GenderConstraint
    String gender;

    @NotBlank(message = "INVALID_ADDRESS")
    String address;

    @NotBlank(message = "INVALID_CLASS")
    String classRoom;

    @NotBlank(message = "INVALID_PARENT_ID")
    String parentId;

    @NotBlank(message = "INVALID_IMAGE_URL")
    String imageUrl;
}
