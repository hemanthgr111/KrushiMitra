package com.krushimitra;

import com.krushimitra.entity.FarmerProfile;
import com.krushimitra.entity.User;
import com.krushimitra.entity.UserRole;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class AllLanguagesValidationTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void allNineLanguagesAreValid() {
        String[] languages = {"en", "kn", "hi", "te", "ta", "ml", "mr", "bn", "gu"};
        String hash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
        for (String lang : languages) {
            User user = new User();
            user.setFullName("Farmer " + lang);
            user.setEmail(lang + "@example.com");
            user.setPhoneNumber("9876543210");
            user.setPasswordHash(hash);
            user.setRole(UserRole.FARMER);

            FarmerProfile profile = new FarmerProfile();
            profile.setUser(user);
            profile.setFarmName("Farm");
            profile.setVillage("Village");
            profile.setDistrict("District");
            profile.setState("State");
            profile.setPreferredLanguage(lang);

            Set<ConstraintViolation<FarmerProfile>> violations = validator.validate(profile);
            assertTrue(violations.isEmpty(), "Language " + lang + " should be valid");
        }
    }
}
