package com.example.bookingService.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CoworkingDto {
    @NotBlank
    private Long seatId;

    @NotBlank
    private String status;

    @NotBlank
    private Time startTime;

    @NotBlank
    private Time endTime;
}
