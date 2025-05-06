package com.example.bookingService.controller;

import com.example.bookingService.dto.CoworkingDto;
import com.example.bookingService.entity.Coworking;
import com.example.bookingService.service.CoworkingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coworking")
@RequiredArgsConstructor
public class CoworkingController {
    private final CoworkingService coworkingService;

    @PostMapping
    public Coworking create(@RequestBody @Valid CoworkingDto coworkingDto) {
        return coworkingService.create(coworkingDto);
    }

    @GetMapping("/{id}")
    public Coworking getById(@PathVariable Long id) {
        return coworkingService.findById(id);
    }

    @GetMapping
    public List<Coworking> getAll() {
        return coworkingService.findAll();
    }

    @PutMapping("/{id}")
    public Coworking update(@PathVariable Long id, @RequestBody CoworkingDto dto) {
        return coworkingService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        coworkingService.delete(id);
    }
}
