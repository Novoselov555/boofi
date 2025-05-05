package com.example.bookingService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.bookingService.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {
}
