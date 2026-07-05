package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.ChangePasswordRequest;
import com.smart_school_bus.SSB.dto.request.UserCreationRequest;
import com.smart_school_bus.SSB.dto.request.UserUpdateRequest;
import com.smart_school_bus.SSB.dto.response.UserResponse;
import com.smart_school_bus.SSB.entity.Role;
import com.smart_school_bus.SSB.entity.User;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.mapper.UserMapper;
import com.smart_school_bus.SSB.repository.RoleRepository;
import com.smart_school_bus.SSB.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Security;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserMapper userMapper;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreationRequest request) {
        User user = userMapper.toUser(request);

        user.setUserName(user.getPhoneNumber());

        String password = user.getDob().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
        user.setPassword(passwordEncoder.encode(password));

        Set<Role> roles = new HashSet<>();
        request.getRoleNames().forEach(roleName -> {
            roleRepository.findById(roleName).ifPresent(roles::add);
        });

        user.setRoles(roles);

        return userMapper.toResponse(userRepository.save(user));
    }

    public UserResponse myInfo() {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return userMapper.toResponse(user);
    }

    public UserResponse getUser(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return userMapper.toResponse(user);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserResponse> getUsers() {
        List<User> users = userRepository.findAll();
        List<UserResponse> responses = users.stream().map(
                user -> {
                    return userMapper.toResponse(user);
                }
        ).toList();
        return responses;
    }

    public UserResponse updateUser(String id, UserUpdateRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userMapper.toResponse(userRepository.save(user));
    }

    @PreAuthorize(value = "hasAuthority('ROLE_ADMIN')")
    public UserResponse updateUser_admin(String id, UserUpdateRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        request.getRoleNames().forEach(roleName -> {
            roleRepository.findById(roleName).ifPresent(role -> {
                roles.add(role);
            });
        });

        user.setRoles(roles);

        return userMapper.toResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteUser(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        userRepository.delete(user);
    }

    public void changePassword(ChangePasswordRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        String oldPassword = request.getOldPassword();
        if (!(passwordEncoder.matches(oldPassword, user.getPassword()) && user.isActivate()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        String newPassword = request.getNewPassword();
        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
    }
}
