package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.ScheduleCreationRequest;
import com.smart_school_bus.SSB.dto.request.ScheduleUpdateRequest;
import com.smart_school_bus.SSB.dto.response.ScheduleResponse;
import com.smart_school_bus.SSB.entity.Bus;
import com.smart_school_bus.SSB.entity.Driver;
import com.smart_school_bus.SSB.entity.Route;
import com.smart_school_bus.SSB.entity.Schedule;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.mapper.ScheduleMapper;
import com.smart_school_bus.SSB.repository.BusRepository;
import com.smart_school_bus.SSB.repository.DriverRepository;
import com.smart_school_bus.SSB.repository.RouteRepository;
import com.smart_school_bus.SSB.repository.ScheduleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ScheduleService {
    ScheduleRepository scheduleRepository;
    ScheduleMapper scheduleMapper;
    DriverRepository driverRepository;
    BusRepository busRepository;
    RouteRepository routeRepository;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ScheduleResponse createSchedule(ScheduleCreationRequest request) {
        Schedule schedule = scheduleMapper.toSchedule(request);

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_FOUND));

        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new AppException(ErrorCode.BUS_NOT_FOUND));

        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new AppException(ErrorCode.ROUTE_NOT_FOUND));

        schedule.setBus(bus);
        schedule.setDriver(driver);
        schedule.setRoute(route);

        return scheduleMapper.toResponse(scheduleRepository.save(schedule));
    }

    public List<ScheduleResponse> getSchedules() {
        return scheduleRepository.findAll()
                .stream()
                .map(scheduleMapper::toResponse)
                .toList();
    }

    public ScheduleResponse getSchedule(String id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SCHEDULE_NOT_FOUND));
        return scheduleMapper.toResponse(schedule);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ScheduleResponse updateSchedule(String id, ScheduleUpdateRequest request) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SCHEDULE_NOT_FOUND));

        scheduleMapper.updateSchedule(schedule, request);

        if (request.getDriverId() != null) {
            Driver driver = driverRepository.findById(request.getDriverId())
                    .orElseThrow(() -> new AppException(ErrorCode.DRIVER_NOT_FOUND));
            schedule.setDriver(driver);
        }

        if (request.getBusId() != null) {
            Bus bus = busRepository.findById(request.getBusId())
                    .orElseThrow(() -> new AppException(ErrorCode.BUS_NOT_FOUND));
            schedule.setBus(bus);
        }

        if (request.getRouteId() != null) {
            Route route = routeRepository.findById(request.getRouteId())
                    .orElseThrow(() -> new AppException(ErrorCode.ROUTE_NOT_FOUND));
            schedule.setRoute(route);
        }

        return scheduleMapper.toResponse(scheduleRepository.save(schedule));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteSchedule(String id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SCHEDULE_NOT_FOUND));

        scheduleRepository.delete(schedule);
    }
}
