package com.smart_school_bus.SSB.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BusLocationResponse {
    String id;
    BusResponse bus;
    BigDecimal latitude;
    BigDecimal longitude;
    LocalDateTime time;
}
