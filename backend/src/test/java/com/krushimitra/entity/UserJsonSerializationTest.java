package com.krushimitra.entity;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserJsonSerializationTest {

    @Test
    void passwordHashIsNotSerialized() throws Exception {
        User user = new User();
        user.setFullName("Test Farmer");
        user.setEmail("farmer@example.com");
        user.setPhoneNumber("9876543210");
        user.setPasswordHash("$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy");
        user.setRole(UserRole.FARMER);

        ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
        String json = mapper.writeValueAsString(user);

        assertFalse(json.contains("passwordHash"));
        assertFalse(json.contains("$2a$10$"));
        assertTrue(json.contains("farmer@example.com"));
    }

    @Test
    void passwordHashCannotBeReadFromJson() throws Exception {
        String json = "{\"fullName\":\"Test\",\"email\":\"a@b.com\",\"phoneNumber\":\"9876543210\",\"role\":\"FARMER\",\"passwordHash\":\"$2a$10$secret\"}";
        ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
        User user = mapper.readValue(json, User.class);
        assertNull(user.getPasswordHash());
    }
}
