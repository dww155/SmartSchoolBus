package com.smart_school_bus.SSB.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RouteBusStopCreationRequest {
    @NotNull(message = "BUS_STOP_NOT_FOUND")
    String busStopId;

    @NotNull(message = "INVALID_ORDER")
    int stopOrder;
}
