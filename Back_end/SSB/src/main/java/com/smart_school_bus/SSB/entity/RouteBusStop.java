package com.smart_school_bus.SSB.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "route_busstop")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RouteBusStop {
    @Id
    @ManyToOne
    @JoinColumn(name = "route_id")
    Route route;

    @Id
    @ManyToOne
    @JoinColumn(name = "bus_stop_id")
    BusStop busStop;

    @Column(name = "stop_order", nullable = false)
    int stopOrder;
}
