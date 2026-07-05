package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.BusStopCreationRequest;
import com.smart_school_bus.SSB.dto.request.BusStopUpdateRequest;
import com.smart_school_bus.SSB.dto.response.BusStopResponse;
import com.smart_school_bus.SSB.entity.BusStop;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.repository.BusStopRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@FieldDefaults(level = AccessLevel.PRIVATE)
@TestPropertySource("/test.properties")
public class BusStopServiceTest {
    @Autowired
    BusStopService service;

    @MockitoBean
    BusStopRepository repository;

    BusStopCreationRequest creationRequest;
    BusStopUpdateRequest updateRequest;
    BusStop busStop;

    @BeforeEach
    public void initData() {
        creationRequest = BusStopCreationRequest.builder()
                .address("bus stop test address")
                .latitude(new BigDecimal(99))
                .longitude(new BigDecimal(180))
                .build();

        updateRequest = BusStopUpdateRequest.builder()
                .address("updated address")
                .latitude(new BigDecimal(50))
                .longitude(new BigDecimal(120))
                .build();

        busStop = BusStop.builder()
                .id("Bus stop test id")
                .address("bus stop test address")
                .latitude(new BigDecimal(99))
                .longitude(new BigDecimal(180))
                .createdAt(LocalDateTime.of(LocalDate.of(2005, 10, 29), LocalTime.of(0,0)))
                .build();
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void createBusStop_success() {
        when(repository.save(any())).thenReturn(busStop);

        BusStopResponse response = service.createBusStop(creationRequest);

        assertEquals("Bus stop test id", response.getId());
    }

    @Test
    public void getBusStops_success() {
        when(repository.findAll()).thenReturn(List.of(busStop));

        List<BusStopResponse> result = service.getBusStops();

        assertEquals(1, result.size());
        assertEquals("bus stop test address", result.get(0).getAddress());
    }

    @Test
    public void getBusStop_success() {
        when(repository.findById("Bus stop test id")).thenReturn(Optional.of(busStop));

        BusStopResponse result = service.getBusStop("Bus stop test id");

        assertEquals("Bus stop test id", result.getId());
        assertEquals("bus stop test address", result.getAddress());
    }

    @Test
    public void getBusStop_notFound_throwException() {
        when(repository.findById("unknown")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> service.getBusStop("unknown"));
        assertEquals(ErrorCode.BUS_STOP_NOT_FOUND, ex.getErrorCode());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void updateBusStop_success() {
        when(repository.findById("Bus stop test id")).thenReturn(Optional.of(busStop));
        when(repository.save(any())).thenReturn(busStop);

        BusStopResponse result = service.updateBusStop("Bus stop test id", updateRequest);

        assertEquals("Bus stop test id", result.getId());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void updateBusStop_fail_notFound() {
        when(repository.findById("Bus stop test id")).thenThrow(new AppException(ErrorCode.BUS_STOP_NOT_FOUND));
        when(repository.save(any())).thenReturn(busStop);

        AppException exception = assertThrows(AppException.class, () -> service.updateBusStop("bus stop id", updateRequest));

        assertEquals(ErrorCode.BUS_STOP_NOT_FOUND, exception.getErrorCode());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void deleteBusStop_success() {
        when(repository.findById("Bus stop test id")).thenReturn(Optional.of(busStop));

        service.deleteBusStop("Bus stop test id");

    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void deleteBusStop_notFound_throwException() {
        when(repository.findById("invalid")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> service.deleteBusStop("invalid"));
        assertEquals(ErrorCode.BUS_STOP_NOT_FOUND, ex.getErrorCode());
    }
}
