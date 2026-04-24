package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.BusCreationRequest;
import com.smart_school_bus.SSB.dto.request.BusUpdateRequest;
import com.smart_school_bus.SSB.dto.response.BusResponse;
import com.smart_school_bus.SSB.entity.Bus;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.mapper.BusMapper;
import com.smart_school_bus.SSB.repository.BusRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BusService {
    BusMapper busMapper;
    BusRepository busRepository;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public BusResponse createBus(BusCreationRequest request) {
        Bus bus = busMapper.toBus(request);

        try {
            busRepository.save(bus);
        } catch (DataIntegrityViolationException exception) {
            if (exception.getMessage().contains("Duplicate entry"))
                throw new AppException(ErrorCode.BUS_EXISTED);
        }

        return busMapper.toResponse(busRepository.save(bus)) ;
    }

    public List<BusResponse> getBuses() {
        List<Bus> buses = busRepository.findAll();

        List<BusResponse> busResponses = buses.stream().map(busMapper::toResponse).toList();

        return busResponses;
    }

    public BusResponse getBus(String id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BUS_NOT_FOUND));

        return busMapper.toResponse(bus);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public BusResponse updateBus(BusUpdateRequest request, String id) {
        Bus bus = busRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.BUS_NOT_FOUND));

        busMapper.updateBus(bus, request);

        return busMapper.toResponse(busRepository.save(bus));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteBus(String id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BUS_NOT_FOUND));

        busRepository.delete(bus);
    }
}
