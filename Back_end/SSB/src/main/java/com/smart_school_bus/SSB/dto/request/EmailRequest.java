package com.smart_school_bus.SSB.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequest {
    @Email(message = "INVALID_TO")
    @NotBlank(message = "INVALID_TO")
    private String to;

    @NotBlank(message = "INVALID_SUBJECT")
    private String subject;

    @NotBlank(message = "INVALID_BODY")
    private String body;
}
