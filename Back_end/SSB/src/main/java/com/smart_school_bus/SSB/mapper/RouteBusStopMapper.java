package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.response.RouteBusStopResponse;
import com.smart_school_bus.SSB.entity.RouteBusStop;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {BusStopMapper.class})
public interface RouteBusStopMapper {
    RouteBusStopResponse toResponse(RouteBusStop routeBusStop);
}
