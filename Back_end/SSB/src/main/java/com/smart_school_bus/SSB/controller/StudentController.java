package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.StudentCreationRequest;
import com.smart_school_bus.SSB.dto.request.StudentScheduleUpdateRequest;
import com.smart_school_bus.SSB.dto.request.StudentUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.StudentResponse;
import com.smart_school_bus.SSB.service.StudentService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StudentController {
    StudentService studentService;

    @PostMapping
    public ApiResponse<StudentResponse> createStudent(@Valid @RequestBody StudentCreationRequest request) {
        StudentResponse data = studentService.createStudent(request);

        ApiResponse response = ApiResponse.<StudentResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create student successfully")
                .build();

        return response;
    }

    @PostMapping("/schedule/{id}")
    public ApiResponse<StudentResponse> updateSchedule(@PathVariable String id, @Valid @RequestBody StudentScheduleUpdateRequest request) {
        StudentResponse data = studentService.updateSchedule(id, request);

        ApiResponse response = ApiResponse.<StudentResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Update student successfully")
                .build();

        return response;
    }

    @GetMapping
    public ApiResponse<List<StudentResponse>> getStudents() {
        List<StudentResponse> data = studentService.getStudents();

        return ApiResponse.<List<StudentResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get all students successfully")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<StudentResponse> getStudent(@PathVariable String id) {
        StudentResponse data = studentService.getStudent(id);

        return ApiResponse.<StudentResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get student successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<StudentResponse> updateStudent(@PathVariable String id, @Valid @RequestBody StudentUpdateRequest request) {
        StudentResponse data = studentService.updateStudent(id, request);

        return ApiResponse.<StudentResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Update student successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Delete student successfully")
                .build();
    }
}
