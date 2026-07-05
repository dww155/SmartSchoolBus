import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ParentMap() {
  const mapRef = useRef(null);
  const [busLocation, setBusLocation] = useState({
    latitude: 10.8231,
    longitude: 106.6297,
  });
  const [schoolLocation] = useState({
    latitude: 10.8500,
    longitude: 106.6600,
  });
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for bus marker
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Simulate bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stations = [
    { id: 1, name: 'Station 1', coordinate: { latitude: 10.8231, longitude: 106.6297 }, passed: true },
    { id: 2, name: 'Station 2', coordinate: { latitude: 10.8280, longitude: 106.6350 }, passed: true },
    { id: 3, name: 'Station 3', coordinate: { latitude: 10.8330, longitude: 106.6400 }, passed: true },
    { id: 4, name: 'Station 4', coordinate: { latitude: 10.8380, longitude: 106.6450 }, passed: false },
    { id: 5, name: 'Station 5', coordinate: { latitude: 10.8430, longitude: 106.6500 }, passed: false },
    { id: 6, name: 'School', coordinate: schoolLocation, passed: false },
  ];

  const centerOnBus = () => {
    mapRef.current?.animateToRegion({
      ...busLocation,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f0f4ff']}
        style={styles.header}
      >
        <Text style={styles.title}>🚌 Live Bus Tracking</Text>
        <Text style={styles.subtitle}>Bus #42 - Route A</Text>
      </LinearGradient>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 10.8350,
            longitude: 106.6450,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={true}
          showsTraffic={false}
        >
          {/* Route polyline */}
          <Polyline
            coordinates={stations.map(s => s.coordinate)}
            strokeColor="#1976D2"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
          />

          {/* Station markers */}
          {stations.map(station => (
            <Marker
              key={station.id}
              coordinate={station.coordinate}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={[
                styles.stationMarker,
                station.passed && styles.stationPassed
              ]}>
                <Text style={[
                  styles.stationText,
                  station.passed && styles.stationTextPassed
                ]}>
                  {station.id === 6 ? '🏫' : station.id}
                </Text>
              </View>
            </Marker>
          ))}

          {/* Bus marker */}
          <Marker
            coordinate={busLocation}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Animated.View style={[
              styles.busMarker,
              { transform: [{ scale: pulseAnim }] }
            ]}>
              <Text style={styles.busEmoji}>🚌</Text>
            </Animated.View>
          </Marker>
        </MapView>

        {/* Center button */}
        <TouchableOpacity style={styles.centerButton} onPress={centerOnBus}>
          <Text style={styles.centerButtonText}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Info cards */}
      <View style={styles.infoContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>⏱️ ETA to School</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>On Time</Text>
            </View>
          </View>
          <Text style={styles.etaText}>12 mins</Text>
          <Text style={styles.distanceText}>2.3 km away</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📍 Current Location</Text>
          <Text style={styles.locationText}>Main St & 5th Ave</Text>
          <Text style={styles.nextStopText}>Next: Station 4 (500m)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centerButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  centerButtonText: {
    fontSize: 20,
  },
  busMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 8,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  busEmoji: {
    fontSize: 20,
  },
  stationMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationPassed: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  stationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  stationTextPassed: {
    color: '#fff',
  },
  infoContainer: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  etaText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E50914',
    marginBottom: 4,
  },
  distanceText: {
    fontSize: 14,
    color: '#999',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  nextStopText: {
    fontSize: 13,
    color: '#1976D2',
    marginTop: 4,
  },
});
