package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.ChangePasswordRequest;
import com.smart_school_bus.SSB.dto.request.UserCreationRequest;
import com.smart_school_bus.SSB.dto.request.UserUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.dto.response.UserResponse;
import com.smart_school_bus.SSB.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping
    public ApiResponse createUser(@Valid @RequestBody UserCreationRequest request) {
        UserResponse data = userService.createUser(request);

        ApiResponse response = ApiResponse.<UserResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Create user successfully")
                .build();

        return response;
    }

    @GetMapping
    public ApiResponse getUsers() {
        List<UserResponse> data = userService.getUsers();

        ApiResponse response = ApiResponse.<List<UserResponse>>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("get all user successfully")
                .build();

        return response;
    }

    @GetMapping("/{id}")
    public ApiResponse getUser(@Valid@PathVariable("id") String id) {
        UserResponse data = userService.getUser(id);

        ApiResponse response = ApiResponse.<UserResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get user successfully")
                .build();

        return response;
    }

    @GetMapping("/me")
    public ApiResponse myInfo() {
        UserResponse data = userService.myInfo();

        ApiResponse response = ApiResponse.<UserResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Get user successfully")
                .build();

        return response;
    }

    @PutMapping("/{id}")
    public ApiResponse updateUser(@PathVariable String id,@Valid @RequestBody UserUpdateRequest request) {
        UserResponse data;
        if (request.getRoleNames().isEmpty())
            data = userService.updateUser(id, request);
        else
            data = userService.updateUser_admin(id, request);

        ApiResponse response = ApiResponse.<UserResponse>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .data(data)
                .message("Update user successfully")
                .build();

        return response;
    }

    @PutMapping("/password/{id}")
    public ApiResponse changePassword(@PathVariable String id,@Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(id, request);

        ApiResponse response = ApiResponse.builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Update user successfully")
                .build();

        return response;
    }

    @DeleteMapping("/{id}")
    public ApiResponse deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        ApiResponse response = ApiResponse.builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Delete user successfully")
                .build();

        return response;
    }
}
