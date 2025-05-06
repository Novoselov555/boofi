package com.example.bookingService.mapper;

import com.example.bookingService.dto.CoworkingDto;
import com.example.bookingService.entity.Coworking;

public class CoworkingMapper {
    public static Coworking toEntity(CoworkingDto dto) {
        Coworking coworking = new Coworking();
        coworking.setSeatId(dto.getSeatId());
        coworking.setStartTime(dto.getStartTime());
        coworking.setEndTime(dto.getEndTime());
        coworking.setStatus(dto.getStatus());
        return coworking;
    }

    public static CoworkingDto toDto(Coworking coworking) {
        CoworkingDto dto = new CoworkingDto();
        dto.setSeatId(coworking.getSeatId());
        dto.setStartTime(coworking.getStartTime());
        dto.setEndTime(coworking.getEndTime());
        dto.setStatus(coworking.getStatus());
        return dto;
    }
}
