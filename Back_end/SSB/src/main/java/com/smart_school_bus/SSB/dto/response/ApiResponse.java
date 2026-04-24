package com.smart_school_bus.SSB.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<Datatype> {
    boolean success = true;
    int status = 1000;
    String message;
    String errorCode;
    Datatype data;
    Instant timestamp;
}
