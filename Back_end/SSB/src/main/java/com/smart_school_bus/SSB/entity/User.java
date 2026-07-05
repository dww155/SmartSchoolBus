package com.smart_school_bus.SSB.entity;

import jakarta.persistence.*;
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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", unique = true, updatable = false)
    String id;

    @Column(name = "password")
    String password;

    @Column(name = "phone_number", nullable = true, unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8_general_ci")
    String phoneNumber;

    @Column(name = "email", nullable = true, unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8_general_ci")
    String email;

    @Column(name = "user_name", nullable = false, unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8_general_ci")
    String userName;

    @Column(name = "first_name", nullable = true)
    String firstName;

    @Column(name = "last_name", nullable = true)
    String lastName;

    @Column(name = "date_of_birth")
    LocalDate dob;

    @Column(name = "address")
    String address;

    @Column(name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;

    @ManyToMany(cascade = CascadeType.ALL)
    Set<Role> roles;

    @Column(name = "isActivated", nullable = false)
    @Builder.Default
    boolean activate = true;

    @Column(name = "gender" )
    String gender;

    @Column(name = "image_url")
    String imageUrl;

    @OneToOne(mappedBy = "user")
    Parent parent;

    @OneToOne(mappedBy = "user")
    Driver driver;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
