package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.BusLocationCreationRequest;
import com.smart_school_bus.SSB.dto.response.BusLocationResponse;
import com.smart_school_bus.SSB.entity.Bus;
import com.smart_school_bus.SSB.entity.BusLocation;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.mapper.BusLocationMapper;
import com.smart_school_bus.SSB.repository.BusLocationRepository;
import com.smart_school_bus.SSB.repository.BusRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BusLocationService {
    BusLocationRepository busLocationRepository;
    BusRepository busRepository;
    BusLocationMapper busLocationMapper;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public BusLocationResponse createBusLocation(BusLocationCreationRequest request) {
        BusLocation busLocation = busLocationMapper.toBusLocation(request);

        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new AppException(ErrorCode.BUS_NOT_FOUND));
        busLocation.setBus(bus);

        return busLocationMapper.toResponse(busLocationRepository.save(busLocation));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<BusLocationResponse> getBusLocations() {
        return busLocationRepository.findAll()
                .stream().map(busLocationMapper::toResponse).toList();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<BusLocationResponse> getBusLocationsByBus(String busId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new AppException(ErrorCode.BUS_NOT_FOUND));

        return busLocationRepository.findAllByBus(bus)
                .stream().map(busLocationMapper::toResponse).toList();
    }

}
