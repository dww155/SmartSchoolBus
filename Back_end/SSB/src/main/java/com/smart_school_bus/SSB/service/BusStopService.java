package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.BusStopCreationRequest;
import com.smart_school_bus.SSB.dto.request.BusStopUpdateRequest;
import com.smart_school_bus.SSB.dto.response.BusStopResponse;
import com.smart_school_bus.SSB.entity.BusStop;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.mapper.BusStopMapper;
import com.smart_school_bus.SSB.repository.BusStopRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BusStopService {
    BusStopRepository busStopRepository;
    BusStopMapper busStopMapper;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public BusStopResponse createBusStop(BusStopCreationRequest request) {
        BusStop busStop = busStopMapper.toBusStop(request);

        return busStopMapper.toResponse(busStopRepository.save(busStop));
    }

    public List<BusStopResponse> getBusStops() {
        List<BusStop> busStops = busStopRepository.findAll();
        List<BusStopResponse> responses = busStops.stream().map(busStopMapper::toResponse).toList();

        return responses;
    }

    public BusStopResponse getBusStop(String id) {
        BusStop busStop = busStopRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BUS_STOP_NOT_FOUND));
        return busStopMapper.toResponse(busStop);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public BusStopResponse updateBusStop(String id, BusStopUpdateRequest request) {
        BusStop busStop = busStopRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BUS_STOP_NOT_FOUND));

        busStopMapper.updateBusStop(busStop, request);

        return busStopMapper.toResponse(busStopRepository.save(busStop));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteBusStop(String id) {
        BusStop busStop = busStopRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BUS_STOP_NOT_FOUND));

        busStopRepository.delete(busStop);
    }
}
