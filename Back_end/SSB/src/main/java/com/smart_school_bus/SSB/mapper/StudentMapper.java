package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.request.StudentCreationRequest;
import com.smart_school_bus.SSB.dto.request.StudentUpdateRequest;
import com.smart_school_bus.SSB.dto.response.StudentResponse;
import com.smart_school_bus.SSB.entity.Student;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {ParentMapper.class, ScheduleMapper.class})
public interface StudentMapper {
    @Mapping(target = "parent", ignore = true)
    Student toStudent(StudentCreationRequest request);

    StudentResponse toResponse(Student student);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateStudent(@MappingTarget Student student, StudentUpdateRequest request);
}
