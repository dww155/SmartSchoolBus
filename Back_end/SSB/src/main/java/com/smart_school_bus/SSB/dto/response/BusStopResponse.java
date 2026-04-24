package com.smart_school_bus.SSB.dto.response;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BusStopResponse {
    String id;
    String address;
    BigDecimal latitude;
    BigDecimal longitude;
    LocalDate createdAt;
}
