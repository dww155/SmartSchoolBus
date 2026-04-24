package com.smart_school_bus.SSB.repository;

import com.smart_school_bus.SSB.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, String> {
    Optional<Driver> findByUser_UserName(String userName);
}
