package com.smart_school_bus.SSB.controller;

import com.smart_school_bus.SSB.dto.request.DriverLocationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DriverLocationController {
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/driver/{driverId}/location.update")
    public void updateLocation(@DestinationVariable String driverId,
                               DriverLocationDTO location) {

        location.setDriverId(driverId);

        System.out.println("Received location from driver " + driverId + ": " +
                location.getLatitude() + ", " + location.getLongitude());

        // gửi tới tất cả client đang xem driver đó
        messagingTemplate.convertAndSend(
                "/topic/driver/location",
                location
        );
    }

}
