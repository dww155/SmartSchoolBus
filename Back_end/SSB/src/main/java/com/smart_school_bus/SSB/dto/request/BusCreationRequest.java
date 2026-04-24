package com.smart_school_bus.SSB.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BusCreationRequest {
    @NotNull(message = "INVALID_LICENSE_PLATE")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "INVALID_LICENSE_PLATE")
    String licensePlate;

    @NotNull(message = "INVALID_CAPACITY")
    @Min(value = 1, message = "INVALID_CAPACITY")
    int capacity;
}
