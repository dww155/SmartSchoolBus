package com.smart_school_bus.SSB.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "bus_stop")
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusStop {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "bus_stop_id")
    String id;

    @Column(nullable = false, unique = true)
    String address;

    @Column(nullable = false, precision = 9, scale = 3)
    BigDecimal latitude;

    @Column(nullable = false, precision = 9, scale = 3)
    BigDecimal longitude;

    @Column(name = "created_at", updatable = false, nullable = false)
    LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
