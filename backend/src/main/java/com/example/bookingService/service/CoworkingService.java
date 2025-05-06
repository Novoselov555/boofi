package com.example.bookingService.service;

import com.example.bookingService.dto.CoworkingDto;
import com.example.bookingService.entity.Coworking;
import com.example.bookingService.exception.ResourceNotFoundException;
import com.example.bookingService.mapper.CoworkingMapper;
import com.example.bookingService.repository.CoworkingRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CoworkingService {
    private final CoworkingRepository coworkingRepository;

    public Coworking create(CoworkingDto dto) {
        Coworking coworking = CoworkingMapper.toEntity(dto);
        return coworkingRepository.save(coworking);
    }

    public Coworking findById(Long id) {
        return coworkingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Coworking not found: " + id));
    }

    public List<Coworking> findAll() {
        return coworkingRepository.findAll();
    }

    public Coworking update(Long id, CoworkingDto dto) {
        Coworking coworking = findById(id);
        coworking.setSeatId(dto.getSeatId());
        coworking.setStartTime(dto.getStartTime());
        coworking.setEndTime(dto.getEndTime());
        coworking.setStatus(dto.getStatus());
        return coworkingRepository.save(coworking);
    }

    public void delete(Long id) {
        if (!coworkingRepository.existsById(id)){
            throw new ResourceNotFoundException("Coworking not found: " + id);
        }
        coworkingRepository.deleteById(id);
    }
}
