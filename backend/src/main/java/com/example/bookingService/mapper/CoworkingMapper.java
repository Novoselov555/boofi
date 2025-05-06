package com.example.bookingService.mapper;

import com.example.bookingService.dto.CoworkingDto;
import com.example.bookingService.entity.Coworking;

public class CoworkingMapper {
    public static Coworking toEntity(CoworkingDto dto) {
        Coworking coworking = new Coworking();
        coworking.setPlace(dto.getPlace());
        coworking.setStartTime(dto.getStartTime());
        coworking.setEndTime(dto.getEndTime());
        return coworking;
    }

    public static CoworkingDto toDto(Coworking coworking) {
        CoworkingDto dto = new CoworkingDto();
        dto.setPlace(coworking.getPlace());
        dto.setStartTime(coworking.getStartTime());
        dto.setEndTime(coworking.getEndTime());
        return dto;
    }
}
