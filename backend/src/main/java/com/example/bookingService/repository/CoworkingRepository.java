package com.example.bookingService.repository;

import com.example.bookingService.entity.Coworking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoworkingRepository extends JpaRepository<Coworking, Long> {
}
