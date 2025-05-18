package com.example.bookingService.service;

import com.example.bookingService.dto.AdminBookingDto;
import com.example.bookingService.entity.Coworking;
import com.example.bookingService.entity.User;
import com.example.bookingService.exception.ResourceNotFoundException;
import com.example.bookingService.repository.CoworkingRepository;
import com.example.bookingService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {
    private final CoworkingRepository coworkingRepository;
    private final UserRepository userRepository;

    public List<Coworking> findAllBookings() {
        return coworkingRepository.findAll();
    }

    public Coworking findBookingById(Long id) {
        return coworkingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Бронирование не найдено: " + id));
    }

    public Coworking updateBooking(Long id, AdminBookingDto dto) {
        Coworking booking = findBookingById(id);
        booking.setUserId(dto.getUserId());
        booking.setSeatId(dto.getSeatId());
        booking.setStatus(dto.getStatus());
        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        return coworkingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        if (!coworkingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Бронирование не найдено: " + id);
        }
        coworkingRepository.deleteById(id);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден: " + id));
    }

    public User updateUserRole(Long id, String role) {
        User user = findUserById(id);
        user.setRole(role);
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Пользователь не найден: " + id);
        }
        userRepository.deleteById(id);
    }
}