package com.smart_school_bus.SSB.repository;

import com.smart_school_bus.SSB.entity.Bus;
import com.smart_school_bus.SSB.entity.BusLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusLocationRepository extends JpaRepository<BusLocation, String> {
    List<BusLocation> findAllByBus(Bus bus);
}
