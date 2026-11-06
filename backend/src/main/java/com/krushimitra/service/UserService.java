package com.krushimitra.service;

import com.krushimitra.dto.RegisterUserRequest;
import com.krushimitra.dto.UserResponse;
import com.krushimitra.entity.User;
import com.krushimitra.entity.UserRole;
import com.krushimitra.exception.EmailAlreadyExistsException;
import com.krushimitra.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(RegisterUserRequest request) {
        String email = request.getEmail() == null ? null : request.getEmail().trim().toLowerCase();
        if (email != null && userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException(email);
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(email);
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(UserRole.FARMER);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        try {
            User saved = userRepository.saveAndFlush(user);
            return UserResponse.from(saved);
        } catch (DataIntegrityViolationException ex) {
            if (isDuplicateEmailViolation(ex, email)) {
                throw new EmailAlreadyExistsException(email);
            }
            throw ex;
        }
    }

    private boolean isDuplicateEmailViolation(DataIntegrityViolationException ex, String email) {
        String message = ex.getMostSpecificCause() != null ? ex.getMostSpecificCause().getMessage() : ex.getMessage();
        if (message == null) {
            return false;
        }
        String lower = message.toLowerCase();
        return lower.contains("uk_users_email") || (lower.contains("email") && (lower.contains("duplicate") || lower.contains("unique")));
    }
}
