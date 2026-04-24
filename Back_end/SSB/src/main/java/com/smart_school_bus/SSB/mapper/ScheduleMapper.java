package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.request.ScheduleCreationRequest;
import com.smart_school_bus.SSB.dto.request.ScheduleUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ScheduleResponse;
import com.smart_school_bus.SSB.entity.Schedule;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BusMapper.class, DriverMapper.class, RouteMapper.class, ScheduleStudentMapper.class})
public interface ScheduleMapper {
    @Mapping(target = "bus", ignore = true)
    @Mapping(target = "driver", ignore = true)
    @Mapping(target = "route", ignore = true)
    Schedule toSchedule(ScheduleCreationRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "bus", ignore = true)
    @Mapping(target = "driver", ignore = true)
    @Mapping(target = "route", ignore = true)
    void updateSchedule(@MappingTarget Schedule schedule, ScheduleUpdateRequest request);

    ScheduleResponse toResponse(Schedule schedule);
}
