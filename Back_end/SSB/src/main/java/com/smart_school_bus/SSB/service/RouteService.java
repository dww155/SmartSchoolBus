package com.smart_school_bus.SSB.service;

import com.smart_school_bus.SSB.dto.request.RouteCreationRequest;
import com.smart_school_bus.SSB.dto.request.RouteUpdateRequest;
import com.smart_school_bus.SSB.dto.response.RouteResponse;
import com.smart_school_bus.SSB.entity.BusStop;
import com.smart_school_bus.SSB.entity.Route;
import com.smart_school_bus.SSB.entity.RouteBusStop;
import com.smart_school_bus.SSB.exception.AppException;
import com.smart_school_bus.SSB.exception.ErrorCode;
import com.smart_school_bus.SSB.mapper.RouteMapper;
import com.smart_school_bus.SSB.repository.BusStopRepository;
import com.smart_school_bus.SSB.repository.RouteRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RouteService {
    RouteRepository routeRepository;
    RouteMapper routeMapper;
    BusStopRepository busStopRepository;

    @Transactional
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public RouteResponse createRoute(RouteCreationRequest request) {
        if (routeRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.ROUTE_EXISTED);
        }

        Route route = routeMapper.toRoute(request);

        Set<RouteBusStop> routeBusStops = new HashSet<>();
        request.getBusStopsOrder().forEach(busStopOrder -> {
            BusStop busStop = busStopRepository.findById(busStopOrder.getBusStopId())
                    .orElseThrow(() -> new AppException(ErrorCode.BUS_STOP_NOT_FOUND));

            routeBusStops.add(
                    RouteBusStop.builder()
                            .route(route)
                            .busStop(busStop)
                            .stopOrder(busStopOrder.getStopOrder())
                            .build()
            );
        });

        route.setBusStops(routeBusStops);
        return routeMapper.toResponse(routeRepository.save(route));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<RouteResponse> getAllRoutes() {
        return routeRepository.findAll()
                .stream()
                .map(routeMapper::toResponse)
                .toList();
    }

    public RouteResponse getRouteById(String id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROUTE_NOT_FOUND));

        return routeMapper.toResponse(route);
    }

    @Transactional
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public RouteResponse updateRoute(String id, RouteUpdateRequest request) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROUTE_NOT_FOUND));

        if (!route.getName().equals(request.getName()) &&
                routeRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.ROUTE_EXISTED);
        }

        routeMapper.updateRoute(route, request);

        Set<RouteBusStop> routeBusStops = new HashSet<>();
        request.getBusStopsOrder().forEach(busStopOrder -> {
            BusStop busStop = busStopRepository.findById(busStopOrder.getBusStopId())
                    .orElseThrow(() -> new AppException(ErrorCode.BUS_STOP_NOT_FOUND));

            routeBusStops.add(
                    RouteBusStop.builder()
                            .route(route)
                            .busStop(busStop)
                            .stopOrder(busStopOrder.getStopOrder())
                            .build()
            );
        });

        route.setBusStops(routeBusStops);

        return routeMapper.toResponse(routeRepository.save(route));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteRoute(String id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROUTE_NOT_FOUND));

        routeRepository.delete(route);
    }
}
