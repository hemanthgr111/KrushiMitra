package com.krushimitra.entity;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class FarmerProfileValidationTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void validFarmerProfileHasNoViolations() {
        User user = new User();
        user.setFullName("Test Farmer");
        user.setEmail("farmer@example.com");
        user.setPhoneNumber("9876543210");
        String hash = "$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLmnopqrstuv";
        user.setPasswordHash(hash);
        user.setRole(UserRole.FARMER);

        FarmerProfile profile = new FarmerProfile();
        profile.setUser(user);
        profile.setFarmName("Green Fields");
        profile.setVillage("Rampur");
        profile.setDistrict("Lucknow");
        profile.setState("Uttar Pradesh");
        profile.setPreferredLanguage("hi");

        Set<ConstraintViolation<FarmerProfile>> violations = validator.validate(profile);
        assertTrue(violations.isEmpty());
    }

    @Test
    void unsupportedLanguageProducesViolation() {
        FarmerProfile profile = new FarmerProfile();
        User user = new User();
        user.setFullName("Test Farmer");
        user.setEmail("farmer@example.com");
        user.setPhoneNumber("9876543210");
        String hash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
        user.setPasswordHash(hash);
        user.setRole(UserRole.FARMER);
        profile.setUser(user);
        profile.setFarmName("Green Fields");
        profile.setVillage("Rampur");
        profile.setDistrict("Lucknow");
        profile.setState("Uttar Pradesh");
        profile.setPreferredLanguage("fr");

        Set<ConstraintViolation<FarmerProfile>> violations = validator.validate(profile);
        assertFalse(violations.isEmpty());
    }
}
