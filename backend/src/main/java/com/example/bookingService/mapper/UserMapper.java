package com.example.bookingService.mapper;

import com.example.bookingService.dto.UserDto;
import com.example.bookingService.entity.User;

public class UserMapper {
    public static User toEntity(UserDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        return user;
    }

    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }
}
