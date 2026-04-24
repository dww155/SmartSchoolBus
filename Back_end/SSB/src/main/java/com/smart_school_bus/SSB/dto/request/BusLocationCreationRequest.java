package com.smart_school_bus.SSB.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BusLocationCreationRequest {
    @NotBlank(message = "INVALID_BUS_ID")
    String busId;

    @NotNull(message = "INVALID_LATITUDE")
    @DecimalMin(value = "-90.000", message = "LATITUDE_OUT_OF_RANGE")
    @DecimalMax(value = "90.000", message = "LATITUDE_OUT_OF_RANGE")
    BigDecimal latitude;

    @NotNull(message = "INVALID_LONGITUDE")
    @DecimalMin(value = "-180.000", message = "LONGITUDE_OUT_OF_RANGE")
    @DecimalMax(value = "180.000", message = "LONGITUDE_OUT_OF_RANGE")
    BigDecimal longitude;
}
