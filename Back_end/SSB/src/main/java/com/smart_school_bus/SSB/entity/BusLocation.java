package com.smart_school_bus.SSB.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BusLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column()
    String id;

    @ManyToOne
    @JoinColumn(name = "bus_id")
    Bus bus;

    @Column(nullable = false, precision = 9, scale = 3, updatable = false)
    BigDecimal latitude;

    @Column(nullable = false, precision = 9, scale = 3, updatable = false)
    BigDecimal longitude;

    @Column(name = "time", nullable = false, updatable = false)
    LocalDateTime time;

    @PrePersist
    public void onCreate() {
        time = LocalDateTime.now();
    }
}
