package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.constant.PredefinedRoles;
import com.smart_school_bus.SSB.dto.request.ParentCreationRequest;
import com.smart_school_bus.SSB.dto.request.UserCreationRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.ParentResponse;
import com.smart_school_bus.SSB.dto.response.UserResponse;
import com.smart_school_bus.SSB.service.ParentService;
import com.smart_school_bus.SSB.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/parent")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ParentController {
    ParentService parentService;
    UserService userService;

    @PostMapping
    public ApiResponse createParent(@Valid @RequestBody ParentCreationRequest request) {
        ParentResponse data = parentService.createParent(request);

        ApiResponse response = ApiResponse.<ParentResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create parent successfully")
                .build();

        return response;
    }

    @PostMapping("/createUser")
    public ApiResponse createUserParent(@Valid @RequestBody UserCreationRequest request) {
        request.setRoleNames(new HashSet<>(Set.of(PredefinedRoles.PARENT_ROLE)));

        UserResponse userResponse = userService.createUser(request);

        ParentCreationRequest parentCreationRequest = ParentCreationRequest.builder()
                .userId(userResponse.getId())
                .build();

        ParentResponse data = parentService.createParent(parentCreationRequest);

        ApiResponse response = ApiResponse.<ParentResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create parent successfully")
                .build();

        return response;
    }

    @GetMapping
    public ApiResponse getParents() {
        List<ParentResponse> data = parentService.getParents();

        ApiResponse response = ApiResponse.<List<ParentResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get all parent successfully")
                .build();

        return response;
    }

    @GetMapping("/{id}")
    public ApiResponse getParent(@PathVariable("id") String id) {
        ParentResponse data = parentService.getParent(id);

        ApiResponse response = ApiResponse.<ParentResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get parent successfully")
                .build();

        return response;
    }

    @GetMapping("/me")
    public ApiResponse getMyInfo() {
        ParentResponse data = parentService.getMyInfo();

        ApiResponse response = ApiResponse.<ParentResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get parent successfully")
                .build();

        return response;
    }

    @DeleteMapping("/{id}")
    public ApiResponse deleteParent(@PathVariable("id") String id) {
        parentService.deleteParent(id);

        ApiResponse response = ApiResponse.builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Delete parent successfully")
                .build();

        return response;
    }
}
