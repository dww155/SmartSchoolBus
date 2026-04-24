package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.StudentCreationRequest;
import com.smart_school_bus.SSB.dto.request.StudentScheduleUpdateRequest;
import com.smart_school_bus.SSB.dto.request.StudentUpdateRequest;
import com.smart_school_bus.SSB.dto.response.StudentResponse;
import com.smart_school_bus.SSB.entity.Parent;
import com.smart_school_bus.SSB.entity.Schedule;
import com.smart_school_bus.SSB.entity.Student;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.mapper.StudentMapper;
import com.smart_school_bus.SSB.repository.ParentRepository;
import com.smart_school_bus.SSB.repository.ScheduleRepository;
import com.smart_school_bus.SSB.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StudentService {
    StudentRepository studentRepository;
    StudentMapper studentMapper;
    ParentRepository parentRepository;
    ScheduleRepository scheduleRepository;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public StudentResponse createStudent(StudentCreationRequest request) {
        Student student = studentMapper.toStudent(request);

        if (studentRepository.existsById(request.getId()))
            throw new AppException(ErrorCode.STUDENT_EXISTED);

        Parent parent = parentRepository.findById(request.getParentId())
                .orElseThrow(() -> new AppException(ErrorCode.PARENT_NOT_FOUND));

        student.setParent(parent);
        return studentMapper.toResponse(studentRepository.save(student));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<StudentResponse> getStudents() {
        List<Student> students = studentRepository.findAll();

        List<StudentResponse> responses = students.stream().map(studentMapper::toResponse).toList();

        return responses;
    }

    public StudentResponse getStudent(String id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));
        return studentMapper.toResponse(student);
    }

    public StudentResponse updateStudent(String id, StudentUpdateRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));

        studentMapper.updateStudent(student, request);

        return studentMapper.toResponse(studentRepository.save(student));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteStudent(String id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));

        studentRepository.delete(student);
    }

    @Transactional
    public StudentResponse updateSchedule(String id, StudentScheduleUpdateRequest studentScheduleUpdateRequest) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STUDENT_NOT_FOUND));

        Set<Schedule> schedules = new HashSet<>();

        studentScheduleUpdateRequest.getScheduleIds().forEach(scheduleId -> {
            Schedule schedule = scheduleRepository.findById(scheduleId)
                    .orElseThrow(() -> new AppException(ErrorCode.SCHEDULE_NOT_FOUND));

            schedule.getStudents().add(student);
            schedules.add(schedule);
        });

        student.setSchedules(schedules);
        return studentMapper.toResponse(studentRepository.save(student));
    }
}