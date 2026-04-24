package com.smart_school_bus.SSB.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "bus")
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "bus_id", unique = true, nullable = false, updatable = false)
    String id;

    @Column(unique = true, nullable = false, columnDefinition = "VARCHAR(255) COLLATE utf8_general_ci")
    String licensePlate;

    @Column(nullable = false)
    int capacity;

    @Column(nullable = false)
    @Builder.Default
    boolean available = true;

    @Column(name = "created_at", updatable = false, nullable = false)
    LocalDateTime createdAt ;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
