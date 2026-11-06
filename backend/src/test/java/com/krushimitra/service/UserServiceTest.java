package com.krushimitra.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.krushimitra.dto.RegisterUserRequest;

import java.time.Instant;
import java.util.UUID;
import com.krushimitra.dto.UserResponse;
import com.krushimitra.entity.User;
import com.krushimitra.entity.UserRole;
import com.krushimitra.exception.EmailAlreadyExistsException;
import com.krushimitra.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder;
    private UserService userService;
    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    void registerStoresBcryptHashAndMatchesOriginal() throws Exception {
        RegisterUserRequest request = new RegisterUserRequest();
        request.setFullName("Test Farmer");
        request.setEmail("farmer@example.com");
        request.setPhoneNumber("9876543210");
        request.setPassword("Secret123!");

        when(userRepository.existsByEmail("farmer@example.com")).thenReturn(false);
        when(userRepository.saveAndFlush(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(UUID.randomUUID());
            u.setCreatedAt(Instant.now());
            u.setUpdatedAt(Instant.now());
            return u;
        });

        UserResponse response = userService.register(request);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).saveAndFlush(captor.capture());
        User saved = captor.getValue();

        assertNotNull(saved.getPasswordHash());
        assertNotEquals("Secret123!", saved.getPasswordHash());
        assertTrue(saved.getPasswordHash().startsWith("$2"));
        assertTrue(passwordEncoder.matches("Secret123!", saved.getPasswordHash()));
        assertEquals(UserRole.FARMER, saved.getRole());
        assertNotNull(response.getCreatedAt());
        assertNotNull(response.getUpdatedAt());

        String json = objectMapper.writeValueAsString(response);
        assertFalse(json.contains("passwordHash"));
        assertFalse(json.contains("Secret123!"));
    }

    @Test
    void duplicateEmailRegistrationIsRejected() {
        RegisterUserRequest request = new RegisterUserRequest();
        request.setFullName("Test Farmer");
        request.setEmail("farmer@example.com");
        request.setPhoneNumber("9876543210");
        request.setPassword("Secret123!");

        when(userRepository.existsByEmail("farmer@example.com")).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> userService.register(request));
        verify(userRepository, never()).save(any());
        verify(userRepository, never()).saveAndFlush(any());
    }

    @Test
    void publicRegistrationAlwaysAssignsFarmerRole() {
        RegisterUserRequest request = new RegisterUserRequest();
        request.setFullName("Test Farmer");
        request.setEmail("farmer@example.com");
        request.setPhoneNumber("9876543210");
        request.setPassword("Secret123!");

        when(userRepository.existsByEmail("farmer@example.com")).thenReturn(false);
        when(userRepository.saveAndFlush(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(UUID.randomUUID());
            u.setCreatedAt(Instant.now());
            u.setUpdatedAt(Instant.now());
            return u;
        });

        userService.register(request);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).saveAndFlush(captor.capture());
        assertEquals(UserRole.FARMER, captor.getValue().getRole());
    }

    @Test
    void duplicateEmailConstraintIsHandledSpecifically() {
        RegisterUserRequest request = new RegisterUserRequest();
        request.setFullName("Test Farmer");
        request.setEmail("farmer@example.com");
        request.setPhoneNumber("9876543210");
        request.setPassword("Secret123!");

        when(userRepository.existsByEmail("farmer@example.com")).thenReturn(false);
        when(userRepository.saveAndFlush(any(User.class))).thenThrow(
                new DataIntegrityViolationException("could not execute statement", new RuntimeException("ERROR: duplicate key value violates unique constraint \"uk_users_email\""))
        );

        assertThrows(EmailAlreadyExistsException.class, () -> userService.register(request));
    }

    @Test
    void unrelatedIntegrityErrorsAreNotConvertedToEmailExists() {
        RegisterUserRequest request = new RegisterUserRequest();
        request.setFullName("Test Farmer");
        request.setEmail("farmer@example.com");
        request.setPhoneNumber("9876543210");
        request.setPassword("Secret123!");

        when(userRepository.existsByEmail("farmer@example.com")).thenReturn(false);
        when(userRepository.saveAndFlush(any(User.class))).thenThrow(
                new DataIntegrityViolationException("could not execute statement", new RuntimeException("ERROR: violates foreign key constraint \"some_other_fk\""))
        );

        assertThrows(DataIntegrityViolationException.class, () -> userService.register(request));
    }
}
