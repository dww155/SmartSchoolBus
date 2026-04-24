package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.request.BusLocationCreationRequest;
import com.smart_school_bus.SSB.dto.response.BusLocationResponse;
import com.smart_school_bus.SSB.entity.BusLocation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {BusMapper.class})
public interface BusLocationMapper {
    @Mapping(target = "bus", ignore = true)
    BusLocation toBusLocation(BusLocationCreationRequest request);

    BusLocationResponse toResponse(BusLocation busLocation);
}
