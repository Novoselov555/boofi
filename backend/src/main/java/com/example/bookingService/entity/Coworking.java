package com.example.bookingService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;

@Entity
@Table(name = "coworking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coworking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name="userId", nullable = false)
    private User user;

    @Column(nullable = false)
    private Long seatId;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Time startTime;

    @Column(nullable = false)
    private Time endTime;
}
