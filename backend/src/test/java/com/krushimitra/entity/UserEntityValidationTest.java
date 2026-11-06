package com.krushimitra.entity;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserEntityValidationTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void validUserHasNoViolations() {
        User user = new User();
        user.setFullName("Test Farmer");
        user.setEmail("farmer@example.com");
        user.setPhoneNumber("+919876543210");
        String hash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
        user.setPasswordHash(hash);
        user.setRole(UserRole.FARMER);

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertTrue(violations.isEmpty());
    }

    @Test
    void invalidEmailProducesViolation() {
        User user = new User();
        user.setFullName("Test Farmer");
        user.setEmail("not-an-email");
        user.setPhoneNumber("9876543210");
        String hash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
        user.setPasswordHash(hash);
        user.setRole(UserRole.FARMER);

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertFalse(violations.isEmpty());
    }

    @Test
    void invalidPhoneProducesViolation() {
        User user = new User();
        user.setFullName("Test Farmer");
        user.setEmail("farmer@example.com");
        user.setPhoneNumber("abc123");
        String hash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
        user.setPasswordHash(hash);
        user.setRole(UserRole.FARMER);

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertFalse(violations.isEmpty());
    }
}
