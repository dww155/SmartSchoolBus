import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NOTIFICATIONS_DATA = [
  {
    id: '1',
    type: 'arrival',
    icon: '🚌',
    title: 'Bus arriving soon',
    message: 'Bus #42 will arrive at your pickup point in 8 minutes',
    time: '5 mins ago',
    bgColor: '#E3F2FD',
    iconColor: '#1976D2',
    unread: true,
  },
  {
    id: '2',
    type: 'station',
    icon: '📍',
    title: 'Passing Station: Main Street',
    message: 'Bus is now passing Main Street station (3/6)',
    time: '12 mins ago',
    bgColor: '#F3E5F5',
    iconColor: '#7B1FA2',
    unread: true,
  },
  {
    id: '3',
    type: 'station',
    icon: '📍',
    title: 'Passing Station: Oak Avenue',
    message: 'Bus is now passing Oak Avenue station (2/6)',
    time: '18 mins ago',
    bgColor: '#FFF3E0',
    iconColor: '#F57C00',
    unread: false,
  },
  {
    id: '4',
    type: 'boarding',
    icon: '✓',
    title: 'Child Boarded',
    message: 'Emma has safely boarded the bus at 7:15 AM',
    time: '25 mins ago',
    bgColor: '#E8F5E9',
    iconColor: '#4CAF50',
    unread: false,
  },
  {
    id: '5',
    type: 'station',
    icon: '📍',
    title: 'Passing Station: Central Park',
    message: 'Bus is now passing Central Park station (1/6)',
    time: '30 mins ago',
    bgColor: '#FFF3E0',
    iconColor: '#F57C00',
    unread: false,
  },
  {
    id: '6',
    type: 'start',
    icon: '🚦',
    title: 'Trip Started',
    message: 'Bus #42 has started the morning route to school',
    time: '35 mins ago',
    bgColor: '#E0F2F1',
    iconColor: '#00897B',
    unread: false,
  },
];

export default function ParentNotifications() {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'stations'

  const filteredData = NOTIFICATIONS_DATA.filter((item) => {
    if (filter === 'unread') return item.unread;
    if (filter === 'stations') return item.type === 'station';
    return true;
  });

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationCard} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <Text style={styles.notificationIcon}>{item.icon}</Text>
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#ffffff', '#f0f4ff', '#e8f0fe']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>Stay updated on your child's journey</Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All ({NOTIFICATIONS_DATA.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, filter === 'unread' && styles.filterTabActive]}
          onPress={() => setFilter('unread')}
        >
          <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
            Unread ({NOTIFICATIONS_DATA.filter((n) => n.unread).length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, filter === 'stations' && styles.filterTabActive]}
          onPress={() => setFilter('stations')}
        >
          <Text style={[styles.filterText, filter === 'stations' && styles.filterTextActive]}>
            Stations ({NOTIFICATIONS_DATA.filter((n) => n.type === 'station').length})
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Route Progress Card */}
      <View style={styles.routeCard}>
        <View style={styles.routeHeader}>
          <Text style={styles.routeTitle}>🚌 Current Route Progress</Text>
          <Text style={styles.routeStatus}>3 of 6 stations</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>
        <Text style={styles.routeNext}>Next: School Entrance (ETA 12 mins)</Text>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    maxHeight: 50,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterTabActive: {
    backgroundColor: '#E50914',
    borderColor: '#E50914',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  routeStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  routeNext: {
    fontSize: 13,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E50914',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
