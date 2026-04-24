package com.smart_school_bus.SSB.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target(value = {ElementType.FIELD})
@Retention(value = RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {DobValidator.class})
public @interface DobConstraint {
    int min();
    String message() default "INVALID_DOB";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
