package com.example.bookingService.config;

import com.example.bookingService.entity.Coworking;
import com.example.bookingService.entity.User;
import com.example.bookingService.repository.CoworkingRepository;
import com.example.bookingService.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DataInitializer implements ApplicationRunner {
    private final UserRepository userRepository;
    private final CoworkingRepository coworkingRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           CoworkingRepository coworkingRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.coworkingRepository = coworkingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        createAdminIfNotExists();
    }

    private void createAdminIfNotExists() {
        String adminEmail = "admin@boofi.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setName("Administrator");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            admin.setCoworkings(new ArrayList<>());
            userRepository.save(admin);
        }
    }
}