package com.smart_school_bus.SSB.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "schedule_id", unique = true, updatable = false, nullable = false)
    String id;

    @ManyToOne
    @JoinColumn(name = "bus_id", nullable = false)
    Bus bus;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    Driver driver;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    Route route;

    @Enumerated(EnumType.STRING)
    @Column(name = "day", nullable = false)
    DayOfWeek day;

    @Column(name = "start_time", nullable = false)
    LocalTime startTime;

    @ManyToMany
    @JoinTable(
            name = "schedule_student",
            joinColumns = @JoinColumn(name = "schedule_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    Set<Student> students;

    @Column(name = "created_at", updatable = false, nullable = false)
    LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
