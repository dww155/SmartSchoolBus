package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.BusCreationRequest;
import com.smart_school_bus.SSB.dto.request.BusUpdateRequest;
import com.smart_school_bus.SSB.dto.response.BusResponse;
import com.smart_school_bus.SSB.entity.Bus;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.repository.BusRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@TestPropertySource("/test.properties")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BusServiceTest {
    @MockitoBean
    BusRepository busRepository;

    @Autowired
    BusService busService;

    Bus bus;
    BusCreationRequest creationRequest;
    BusUpdateRequest updateRequest;
    BusResponse busResponse;

    @BeforeEach
    public void initData() {
        bus = Bus.builder()
                .id("Bus_1")
                .licensePlate("ABC-123")
                .capacity(40)
                .build();

        creationRequest = BusCreationRequest.builder()
                .licensePlate("ABC-123")
                .capacity(40)
                .build();

        updateRequest = BusUpdateRequest.builder()
                .licensePlate("XYZ-999")
                .capacity(45)
                .build();

        busResponse = BusResponse.builder()
                .id("Bus_1")
                .licensePlate("ABC-123")
                .capacity(40)
                .build();
    }

    // --- CREATE BUS ---
    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void createBus_success() {
        when(busRepository.save(any())).thenReturn(bus);

        BusResponse response = busService.createBus(creationRequest);

        Assertions.assertEquals("ABC-123", response.getLicensePlate());
    }

    // --- GET ALL ---
    @Test
    public void getAllBuses_success() {
        when(busRepository.findAll()).thenReturn(List.of(bus));

        List<BusResponse> result = busService.getBuses();

        Assertions.assertEquals("ABC-123", result.get(0).getLicensePlate());
    }

    // --- GET ONE ---
    @Test
    public void getBus_success() {
        when(busRepository.findById("Bus_1")).thenReturn(Optional.of(bus));

        BusResponse result = busService.getBus("Bus_1");

        Assertions.assertEquals("ABC-123", result.getLicensePlate());
    }

    @Test
    public void getBus_notFound() {
        when(busRepository.findById("Bus_2")).thenReturn(Optional.empty());

        AppException exception = Assertions.assertThrows(
                AppException.class,
                () -> busService.getBus("Bus_2")
        );

        Assertions.assertEquals(ErrorCode.BUS_NOT_FOUND, exception.getErrorCode());
    }

    // --- UPDATE BUS ---
    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void updateBus_success() {
        when(busRepository.findById("Bus_1")).thenReturn(Optional.of(bus));
        when(busRepository.save(any())).thenReturn(bus);

        BusResponse result = busService.updateBus(updateRequest, "Bus_1");

        Assertions.assertEquals("XYZ-999", result.getLicensePlate());
    }

    // --- DELETE BUS ---
    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void deleteBus_success() {
        when(busRepository.findById("Bus_1")).thenReturn(Optional.of(bus));

        busService.deleteBus("Bus_1");

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void deleteBus_notFound() {
        when(busRepository.findById("Bus_404")).thenReturn(Optional.empty());

        AppException exception = Assertions.assertThrows(
                AppException.class,
                () -> busService.deleteBus("Bus_404")
        );

        Assertions.assertEquals(ErrorCode.BUS_NOT_FOUND, exception.getErrorCode());
    }
}
