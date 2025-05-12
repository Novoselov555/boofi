package com.example.bookingService.service;

import com.example.bookingService.exception.ResourceNotFoundException;
import com.example.bookingService.dto.UserDto;
import com.example.bookingService.entity.User;
import com.example.bookingService.mapper.UserMapper;
import com.example.bookingService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User create(UserDto userDto) {
        User user = UserMapper.toEntity(userDto);
        return userRepository.save(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User update(Long id, User user) {
        User u = findById(id);
        u.setName(user.getName());
        u.setEmail(user.getEmail());
        u.setPassword(user.getPassword());
        return userRepository.save(user);
    }

    public void delete(Long id) {
        if (!userRepository.existsById(id)){
            throw new ResourceNotFoundException("User not found: " + id);
        }
        userRepository.deleteById(id);
    }
}
