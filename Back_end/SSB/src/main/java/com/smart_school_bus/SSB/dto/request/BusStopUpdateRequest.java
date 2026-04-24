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
public class BusStopUpdateRequest {

    @NotBlank(message = "INVALID_ADDRESS")
    String address;

    @NotNull(message = "INVALID_LATITUDE")
    @DecimalMin(value = "-90.000", message = "INVALID_LATITUDE")
    @DecimalMax(value = "90.000", message = "INVALID_LATITUDE")
    BigDecimal latitude;

    @NotNull(message = "INVALID_LONGITUDE")
    @DecimalMin(value = "-180.000", message = "INVALID_LONGITUDE")
    @DecimalMax(value = "180.000", message = "INVALID_LONGITUDE")
    BigDecimal longitude;
}
