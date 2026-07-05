package com.smart_school_bus.SSB.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = GenderValidation.class)
public @interface GenderConstraint {
    String message() default "INVALID_GENDER";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
