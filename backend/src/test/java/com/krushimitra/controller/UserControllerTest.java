package com.krushimitra.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.krushimitra.dto.UserResponse;
import com.krushimitra.entity.User;
import com.krushimitra.entity.UserRole;
import com.krushimitra.exception.EmailAlreadyExistsException;
import com.krushimitra.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.UUID;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();

    @Test
    void registerReturns201AndNoPasswordHash() throws Exception {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setFullName("Test Farmer");
        user.setEmail("farmer@example.com");
        user.setPhoneNumber("9876543210");
        user.setRole(UserRole.FARMER);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());

        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        when(userService.register(any())).thenReturn(UserResponse.from(user));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "fullName": "Test Farmer",
                                  "email": "farmer@example.com",
                                  "phoneNumber": "9876543210",
                                  "password": "Secret123!"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email", is("farmer@example.com")))
                .andExpect(jsonPath("$.role", is("FARMER")))
                .andExpect(jsonPath("$.createdAt").exists())
                .andExpect(jsonPath("$.updatedAt").exists())
                .andExpect(jsonPath("$.passwordHash").doesNotExist())
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void invalidRequestReturns400() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "fullName": "",
                                  "email": "not-an-email",
                                  "phoneNumber": "abc",
                                  "password": "short"
                                }
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void duplicateEmailReturns409() throws Exception {
        when(userService.register(any())).thenThrow(new EmailAlreadyExistsException("farmer@example.com"));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "fullName": "Test Farmer",
                                  "email": "farmer@example.com",
                                  "phoneNumber": "9876543210",
                                  "password": "Secret123!"
                                }
                                """))
                .andExpect(status().isConflict());
    }
}
