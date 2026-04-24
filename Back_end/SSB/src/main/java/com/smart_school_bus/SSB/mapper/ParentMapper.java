package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.response.ParentResponse;
import com.smart_school_bus.SSB.entity.Parent;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UserMapper.class, StudentMapper.class})
public interface ParentMapper {

    ParentResponse toResponse(Parent parent);
}
