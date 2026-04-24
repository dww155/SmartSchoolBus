import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

export default function ParentHome({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  
  const isGuest = userInfo?.type === 'guest';
  const displayName = isGuest 
    ? 'Guest' 
    : `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim() || 'User';
  
  return (
    <LinearGradient colors={['#ffffff', '#f0f4ff', '#e8f0fe']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning! 👋</Text>
          <Text style={styles.parentName}>{displayName}</Text>
          {isGuest && <Text style={styles.guestTag}>👤 Guest Mode</Text>}
        </View>

        {/* Bus Status Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardIcon}>🚌</Text>
              <View>
                <Text style={styles.cardTitle}>Bus Status</Text>
                <Text style={styles.cardSubtitle}>Bus #42 - Route A</Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>● Active</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.etaContainer}>
            <View style={styles.etaBox}>
              <Text style={styles.etaLabel}>ETA to School</Text>
              <Text style={styles.etaTime}>12 mins</Text>
              <Text style={styles.etaSubtext}>On time</Text>
            </View>
            <View style={styles.etaDivider} />
            <View style={styles.etaBox}>
              <Text style={styles.etaLabel}>Current Location</Text>
              <Text style={styles.etaLocation}>📍 Main St & 5th</Text>
              <Text style={styles.etaSubtext}>2.3 km away</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewMapButton}
            onPress={() => navigation.navigate('Map')}
          >
            <Text style={styles.viewMapText}>View Live Map</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Child Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardIcon}>👧</Text>
              <View>
                <Text style={styles.cardTitle}>Your Child</Text>
                <Text style={styles.cardSubtitle}>Emma Johnson</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.childInfoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Grade</Text>
              <Text style={styles.infoValue}>5th Grade</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Boarding Time</Text>
              <Text style={styles.infoValue}>7:15 AM</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValueGreen}>✓ On Board</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.actionIcon}>🔔</Text>
            <Text style={styles.actionText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Map')}
          >
            <Text style={styles.actionIcon}>🗺️</Text>
            <Text style={styles.actionText}>Live Map</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📞</Text>
            <Text style={styles.actionText}>Contact Driver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>Trip History</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Trips */}
        <Text style={styles.sectionTitle}>Recent Trips</Text>
        <View style={styles.tripCard}>
          <View style={styles.tripRow}>
            <Text style={styles.tripDate}>Today, 7:20 AM</Text>
            <Text style={styles.tripStatus}>✓ Completed</Text>
          </View>
          <Text style={styles.tripRoute}>Home → School</Text>
          <Text style={styles.tripDuration}>Duration: 18 mins</Text>
        </View>

        <View style={styles.tripCard}>
          <View style={styles.tripRow}>
            <Text style={styles.tripDate}>Yesterday, 3:45 PM</Text>
            <Text style={styles.tripStatus}>✓ Completed</Text>
          </View>
          <Text style={styles.tripRoute}>School → Home</Text>
          <Text style={styles.tripDuration}>Duration: 22 mins</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: '#5f6368',
    marginBottom: 4,
  },
  parentName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  etaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  etaBox: {
    flex: 1,
  },
  etaDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  etaLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  etaTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E50914',
    marginBottom: 2,
  },
  etaLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  etaSubtext: {
    fontSize: 12,
    color: '#666',
  },
  viewMapButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  viewMapText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
  },
  arrow: {
    fontSize: 20,
    color: '#1976D2',
  },
  childInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoValueGreen: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  actionCard: {
    width: (width - 56) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tripStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  tripRoute: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tripDuration: {
    fontSize: 13,
    color: '#999',
  },
  guestTag: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
});
