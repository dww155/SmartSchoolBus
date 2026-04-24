package com.smart_school_bus.SSB.mapper;

import com.smart_school_bus.SSB.dto.response.ScheduleWithoutStudentsResponse;
import com.smart_school_bus.SSB.dto.response.StudentWithoutSchedulesResponse;
import com.smart_school_bus.SSB.entity.Schedule;
import com.smart_school_bus.SSB.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ScheduleStudentMapper {
    StudentWithoutSchedulesResponse toScheduleResponse(Student student);
    ScheduleWithoutStudentsResponse toStudentResponse(Schedule schedule);
}
