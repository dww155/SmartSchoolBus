package com.smart_school_bus.SSB.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DriverUpdateRequest {
    @NotBlank(message = "INVALID_DRIVER_LICENSE")
    @Pattern(regexp = "^[A-Z0-9-]{6,15}$", message = "INVALID_DRIVER_LICENSE")
    String driverLicense;
}
