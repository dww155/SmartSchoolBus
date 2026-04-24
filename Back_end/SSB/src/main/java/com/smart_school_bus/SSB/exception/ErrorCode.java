package com.smart_school_bus.SSB.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    UNCATEGORIZED(9999, "Uncategorized error catch", HttpStatus.INTERNAL_SERVER_ERROR),

    INVALID_PASSWORD(1001, "Invalid password", HttpStatus.UNAUTHORIZED),
    INVALID_DOB(1002, "Age must be at least {min}", HttpStatus.UNPROCESSABLE_ENTITY),
    INVALID_PHONE_NUMBER(1003, "Invalid phone number", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1004, "User not found", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1005, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    DOUBLE_ENTRY(1006, "Added object existed", HttpStatus.CONFLICT),
    UNKNOWN_KEY(1007, "Unknown validator", HttpStatus.BAD_REQUEST),
    INVALID_FIRST_NAME(1008, "Invalid first name", HttpStatus.BAD_REQUEST),
    INVALID_ROLES(1009, "Invalid roles for staff", HttpStatus.FORBIDDEN),
    INVALID_EMAIL(1010, "Invalid email", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED(1011, "Access denied", HttpStatus.BAD_REQUEST),

    // Bus
    INVALID_LICENSE_PLATE(1012, "Invalid license plate for bus", HttpStatus.BAD_REQUEST),
    INVALID_CAPACITY(1013, "Invalid capacity for bus", HttpStatus.BAD_REQUEST),
    BUS_NOT_FOUND(1014, "Bus not found", HttpStatus.NOT_FOUND),
    BUS_EXISTED(1015, "Bus existed", HttpStatus.CONFLICT),

    // Student
    INVALID_STUDENT_ID(1016, "Invalid student ID", HttpStatus.BAD_REQUEST),
    INVALID_FIRST_LAST_NAME(1017, "Invalid last name", HttpStatus.BAD_REQUEST),
    INVALID_CLASSROOM(1018, "Invalid classroom", HttpStatus.BAD_REQUEST),
    INVALID_IMAGE_URL(1019, "Invalid image URL", HttpStatus.BAD_REQUEST),
    STUDENT_EXISTED(1020, "Student existed", HttpStatus.CONFLICT),
    STUDENT_NOT_FOUND(1021, "Student not found", HttpStatus.NOT_FOUND),

    // User
    USER_EXISTED(1022, "User existed", HttpStatus.CONFLICT),

    // Parent
    PARENT_NOT_FOUND(1023, "Parent not found", HttpStatus.NOT_FOUND),

    // Email
    INVALID_EMAIL_TO(1024, "Invalid recipient email", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL_SUBJECT(1025, "Invalid subject", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL_BODY(1026, "Invalid body", HttpStatus.BAD_REQUEST),

    // Bus Stop
    INVALID_ADDRESS(1027, "Invalid address", HttpStatus.BAD_REQUEST),
    INVALID_LATITUDE(1028, "Invalid latitude", HttpStatus.BAD_REQUEST),
    INVALID_LONGITUDE(1029, "Invalid longitude", HttpStatus.BAD_REQUEST),
    BUS_STOP_NOT_FOUND(1030, "Bus stop not found", HttpStatus.NOT_FOUND),

    // Driver
    INVALID_DRIVER_LICENSE(1031, "Invalid driver license", HttpStatus.BAD_REQUEST),
    DRIVER_NOT_FOUND(1032, "Driver not found", HttpStatus.NOT_FOUND),
    DRIVER_EXISTED(1033, "Driver existed", HttpStatus.CONFLICT),

    // Route
    INVALID_ROUTE_NAME(1034, "Invalid route name", HttpStatus.BAD_REQUEST),
    INVALID_ROUTE_DISTANCE(1035, "Invalid route distance", HttpStatus.BAD_REQUEST),
    INVALID_ROUTE_BUSSTOP_IDS(1036, "Invalid route bus stop ids", HttpStatus.BAD_REQUEST),
    ROUTE_NOT_FOUND(1037, "Route not found", HttpStatus.NOT_FOUND),
    ROUTE_EXISTED(1038, "Route existed", HttpStatus.CONFLICT),
    INVALID_ORDER(1039, "Invalid bus stop order", HttpStatus.BAD_REQUEST),

    // Schedule
    INVALID_BUS_ID(1040, "Invalid bus ID", HttpStatus.BAD_REQUEST),
    INVALID_DRIVER_ID(1041, "Invalid driver ID", HttpStatus.BAD_REQUEST),
    INVALID_ROUTE_ID(1042, "Invalid route ID", HttpStatus.BAD_REQUEST),
    INVALID_START_TIME(1043, "Invalid start time", HttpStatus.BAD_REQUEST),
    INVALID_END_TIME(1044, "Invalid end time", HttpStatus.BAD_REQUEST),
    INVALID_SCHEDULE_TIME_RANGE(1045, "End time must be after start time", HttpStatus.BAD_REQUEST),
    SCHEDULE_NOT_FOUND(1046, "Schedule not found", HttpStatus.NOT_FOUND),
    SCHEDULE_EXISTED(1047, "Schedule existed", HttpStatus.CONFLICT),
    INVALID_GENDER(1048, "Invalid gender", HttpStatus.CONFLICT),

    ;
    int code;
    String message;
    HttpStatusCode httpStatusCode;
}
