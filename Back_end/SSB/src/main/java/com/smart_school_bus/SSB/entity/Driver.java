package com.smart_school_bus.SSB.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "driver_id", unique = true, updatable = false, nullable = false)
    String id;

    @Column(name = "driver_license", unique = true, nullable = false)
    String driverLicense;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    User user;

    @OneToMany(mappedBy = "driver")
    Set<Schedule> schedules;
}
