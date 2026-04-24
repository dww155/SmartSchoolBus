package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.request.BusStopCreationRequest;
import com.smart_school_bus.SSB.dto.request.BusStopUpdateRequest;
import com.smart_school_bus.SSB.dto.response.BusStopResponse;
import com.smart_school_bus.SSB.entity.BusStop;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface BusStopMapper {
    BusStopResponse toResponse(BusStop busStop);

    BusStop toBusStop(BusStopCreationRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBusStop(@MappingTarget BusStop busStop, BusStopUpdateRequest request);
}
