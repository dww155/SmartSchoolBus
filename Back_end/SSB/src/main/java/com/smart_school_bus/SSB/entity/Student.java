package com.smart_school_bus.SSB.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Past;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    @Column(name = "student_id", nullable = false, updatable = false, unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8_general_ci")
    String id;

    @Column(name = "first_name", nullable = false)
    String firstName;

    @Column(name = "last_name", nullable = false)
    String lastName;

    @Past
    @Column(name = "date_of_birth", nullable = false)
    LocalDate dob;

    @Column(name = "gender", nullable = false)
    String gender;

    @Column(name = "address", nullable = false)
    String address;

    @Column(name = "class_name", nullable = false)
    String classRoom;

    @Column(name = "image_url")
    String imageUrl;

    @Column(name = "created_at", updatable = false, nullable = false)
    LocalDateTime createdAt ;

    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = false)
    Parent parent;

    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    Set<Schedule> schedules;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
    