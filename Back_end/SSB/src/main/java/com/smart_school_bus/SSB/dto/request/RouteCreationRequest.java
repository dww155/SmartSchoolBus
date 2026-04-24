package com.smart_school_bus.SSB.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RouteCreationRequest {
    @NotBlank(message = "INVALID_ROUTE_NAME")
    String name;

    String description;

    @NotNull(message = "INVALID_ROUTE_DISTANCE")
    @Min(value = 0, message = "INVALID_ROUTE_DISTANCE")
    Double distance;

    @NotNull(message = "INVALID_ROUTE_BUSSTOP_IDS")
    Set<RouteBusStopCreationRequest> busStopsOrder;
}
