package com.smart_school_bus.SSB.repository;


import com.smart_school_bus.SSB.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route, String> {
    boolean existsByName(String s);
}
