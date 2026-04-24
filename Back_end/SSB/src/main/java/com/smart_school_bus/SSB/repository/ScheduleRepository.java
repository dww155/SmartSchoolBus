package com.smart_school_bus.SSB.repository;

import com.smart_school_bus.SSB.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, String> {
}
