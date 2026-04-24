package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.request.RouteCreationRequest;
import com.smart_school_bus.SSB.dto.request.RouteUpdateRequest;
import com.smart_school_bus.SSB.dto.response.RouteResponse;
import com.smart_school_bus.SSB.entity.Route;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {RouteBusStopMapper.class})
public interface RouteMapper {
    @Mapping(target = "busStops", ignore = true)
    Route toRoute(RouteCreationRequest request);

    RouteResponse toResponse(Route route);

    @Mapping(target = "busStops", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateRoute(@MappingTarget Route route, RouteUpdateRequest request);
}

