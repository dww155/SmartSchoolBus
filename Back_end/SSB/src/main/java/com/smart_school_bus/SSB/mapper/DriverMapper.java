package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.request.DriverCreationRequest;
import com.smart_school_bus.SSB.dto.request.DriverUpdateRequest;
import com.smart_school_bus.SSB.dto.response.DriverResponse;
import com.smart_school_bus.SSB.dto.response.DriverResponseWithSchedules;
import com.smart_school_bus.SSB.entity.Driver;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface DriverMapper {
    @Mapping(target = "user", ignore = true)
    Driver toDriver(DriverCreationRequest request);

    DriverResponse toResponse(Driver driver);
    DriverResponseWithSchedules toResponseWithSchedules(Driver driver);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDriver(@MappingTarget Driver driver, DriverUpdateRequest request);
}
