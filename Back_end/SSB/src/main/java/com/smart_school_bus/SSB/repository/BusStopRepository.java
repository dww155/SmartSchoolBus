package com.smart_school_bus.SSB.repository;

import com.smart_school_bus.SSB.entity.BusStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusStopRepository extends JpaRepository<BusStop, String> {
}
