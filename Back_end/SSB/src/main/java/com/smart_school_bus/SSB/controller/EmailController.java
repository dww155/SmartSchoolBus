package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.EmailRequest;
import com.smart_school_bus.SSB.dto.response.ApiResponse;
import com.smart_school_bus.SSB.service.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailController {
    EmailService emailService;

    @PostMapping("/send")
    public ApiResponse<Void> sendMail(@RequestBody EmailRequest request) {
        emailService.sendSimpleEmail(request.getTo(),request.getSubject(), request.getBody());

        return ApiResponse.<Void>builder()
                .success(true)
                .status(1000)
                .timestamp(Instant.now())
                .message("Email sent successfully")
                .build();
    }
}
