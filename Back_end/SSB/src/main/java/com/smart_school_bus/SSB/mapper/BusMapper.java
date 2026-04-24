package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.request.BusCreationRequest;
import com.smart_school_bus.SSB.dto.request.BusUpdateRequest;
import com.smart_school_bus.SSB.dto.response.BusResponse;
import com.smart_school_bus.SSB.entity.Bus;
import org.mapstruct.*;

import java.lang.annotation.Target;

@Mapper(componentModel = "spring")
public interface BusMapper {
    Bus toBus(BusCreationRequest request);

    BusResponse toResponse(Bus bus);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBus(@MappingTarget Bus bus, BusUpdateRequest request);
}
