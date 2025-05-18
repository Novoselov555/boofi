package com.example.bookingService.controller;

import com.example.bookingService.dto.AdminBookingDto;
import com.example.bookingService.entity.Coworking;
import com.example.bookingService.entity.User;
import com.example.bookingService.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/bookings")
    public List<Coworking> getAllBookings() {
        return adminService.findAllBookings();
    }

    @GetMapping("/bookings/{id}")
    public Coworking getBookingById(@PathVariable Long id) {
        return adminService.findBookingById(id);
    }

    @PutMapping("/bookings/{id}")
    public Coworking updateBooking(@PathVariable Long id, @RequestBody @Valid AdminBookingDto bookingDto) {
        return adminService.updateBooking(id, bookingDto);
    }

    @DeleteMapping("/bookings/{id}")
    public void deleteBooking(@PathVariable Long id) {
        adminService.deleteBooking(id);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.findAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return adminService.findUserById(id);
    }

    @PutMapping("/users/{id}/role")
    public User updateUserRole(@PathVariable Long id, @RequestBody String role) {
        return adminService.updateUserRole(id, role);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
    }
}