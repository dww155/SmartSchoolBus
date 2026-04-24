package com.smart_school_bus.SSB.exception;

import com.smart_school_bus.SSB.dto.response.ApiResponse;
import jakarta.validation.ConstraintViolation;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.Map;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ApiResponse> ExceptionHandler (Exception exception) {
        exception.printStackTrace();

        ErrorCode errorCode = ErrorCode.UNCATEGORIZED;

        ApiResponse apiResponse = ApiResponse.builder()
                .success(false)
                .status(errorCode.getCode())
                .message(errorCode.getMessage())
                .timestamp(Instant.now())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse> AppExceptionHandler (AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();

        ApiResponse apiResponse = ApiResponse.builder()
                .success(false)
                .status(errorCode.getCode())
                .message(errorCode.getMessage())
                .timestamp(Instant.now())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse> AppExceptionHandler (DataIntegrityViolationException exception) {
        ErrorCode errorCode = ErrorCode.UNCATEGORIZED;
        String message = exception.getMessage();
        if (message.contains("Duplicate entry")) {
            errorCode = ErrorCode.DOUBLE_ENTRY;
        }

        ApiResponse apiResponse = ApiResponse.builder()
                .success(false)
                .status(errorCode.getCode())
                .message(errorCode.getMessage())
                .timestamp(Instant.now())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AuthorizationDeniedException.class)
    public ResponseEntity<ApiResponse> AuthorizationDeniedExceptionHandler (AuthorizationDeniedException exception) {
        ErrorCode errorCode = ErrorCode.ACCESS_DENIED;

        ApiResponse apiResponse = ApiResponse.builder()
                .success(false)
                .status(errorCode.getCode())
                .message(errorCode.getMessage())
                .timestamp(Instant.now())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> AppExceptionHandler (MethodArgumentNotValidException exception) {
        ErrorCode errorCode = ErrorCode.UNCATEGORIZED;
        Map<String, Object> attribute = null;

        try {
            errorCode = ErrorCode.valueOf(exception.getFieldError().getDefaultMessage());

            ConstraintViolation constraintViolation = exception.getBindingResult().getAllErrors().getFirst().unwrap(ConstraintViolation.class);
            attribute = constraintViolation.getConstraintDescriptor().getAttributes();
        } catch (Exception e) {
        }

        String message = errorCode.getMessage();

        if (Objects.nonNull(attribute.get("min"))) {
            String min = attribute.get("min").toString();

            message = message.replace("{min}", min);
        }

        ApiResponse apiResponse = ApiResponse.builder()
                .success(false)
                .status(errorCode.getCode())
                .message(message)
                .timestamp(Instant.now())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }
}
