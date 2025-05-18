package com.example.bookingService.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminBookingDto {
    @NotNull
    private Long userId;

    @NotNull
    private Long seatId;

    @NotBlank
    private String status;

    @NotNull
    private Time startTime;

    @NotNull
    private Time endTime;
}