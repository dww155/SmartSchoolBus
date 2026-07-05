import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../context/AuthContext';

export default function ParentProfile() {
  const { logout, userInfo, updateUserInfo } = useContext(AuthContext);
  
  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    gender: userInfo?.gender || '',
    dateOfBirth: userInfo?.dateOfBirth || '',
    phone: userInfo?.phone || '',
  });
  
  const [avatarUri, setAvatarUri] = useState(userInfo?.avatar || null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [tempDate, setTempDate] = useState(
    editedInfo.dateOfBirth ? new Date(editedInfo.dateOfBirth) : new Date()
  );

  const isGuest = userInfo?.type === 'guest';
  const displayName = isGuest 
    ? 'Guest User' 
    : `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim() || 'User';
  
  const displayInitials = isGuest
    ? '👤'
    : `${(userInfo?.firstName || 'U')[0]}${(userInfo?.lastName || 'U')[0]}`.toUpperCase();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to change your avatar!',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      updateUserInfo({ avatar: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    // Validate phone number
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    if (editedInfo.phone && !phoneRegex.test(editedInfo.phone.replace(/\s/g, ''))) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number (10-15 digits)');
      return;
    }

    // Validate required fields
    if (!editedInfo.firstName.trim()) {
      Alert.alert('Required Field', 'First name is required');
      return;
    }

    updateUserInfo(editedInfo);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedInfo({
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
      gender: userInfo?.gender || '',
      dateOfBirth: userInfo?.dateOfBirth || '',
      phone: userInfo?.phone || '',
    });
    setIsEditing(false);
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setTempDate(selectedDate);
      const dateString = selectedDate.toISOString().split('T')[0];
      setEditedInfo({ ...editedInfo, dateOfBirth: dateString });
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <LinearGradient colors={['#ffffff', '#f0f4ff', '#e8f0fe']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Avatar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, isGuest && styles.guestAvatar]}>
                <Text style={styles.avatarText}>{displayInitials}</Text>
              </View>
            )}
            <View style={styles.editBadge}>
              <Text style={styles.editIcon}>📷</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{userInfo?.email || 'No email'}</Text>
          {isGuest && <Text style={styles.guestBadge}>👤 Guest Account</Text>}
        </View>

        {/* Parent Info Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Parent Information</Text>
            {!isEditing ? (
              <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                <Text style={styles.editButtonText}>✏️ Edit</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.editActions}>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.card}>
            {/* First Name */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>First Name *</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedInfo.firstName}
                  onChangeText={(text) => setEditedInfo({ ...editedInfo, firstName: text })}
                  placeholder="Enter first name"
                  placeholderTextColor="#999"
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo?.firstName || 'Not set'}</Text>
              )}
            </View>
            <View style={styles.divider} />

            {/* Last Name */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Name</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedInfo.lastName}
                  onChangeText={(text) => setEditedInfo({ ...editedInfo, lastName: text })}
                  placeholder="Enter last name"
                  placeholderTextColor="#999"
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo?.lastName || 'Not set'}</Text>
              )}
            </View>
            <View style={styles.divider} />

            {/* Gender */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Gender</Text>
              {isEditing ? (
                <TouchableOpacity onPress={() => setShowGenderModal(true)} style={styles.pickerButton}>
                  <Text style={[styles.infoValue, !editedInfo.gender && styles.placeholder]}>
                    {editedInfo.gender || 'Select gender'}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.infoValue}>{userInfo?.gender || 'Not set'}</Text>
              )}
            </View>
            <View style={styles.divider} />

            {/* Date of Birth */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              {isEditing ? (
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.pickerButton}>
                  <Text style={[styles.infoValue, !editedInfo.dateOfBirth && styles.placeholder]}>
                    {editedInfo.dateOfBirth ? formatDate(editedInfo.dateOfBirth) : 'Select date'}
                  </Text>
                  <Text style={styles.dropdownIcon}>📅</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.infoValue}>{formatDate(userInfo?.dateOfBirth)}</Text>
              )}
            </View>
            <View style={styles.divider} />

            {/* Phone Number */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedInfo.phone}
                  onChangeText={(text) => setEditedInfo({ ...editedInfo, phone: text })}
                  placeholder="Enter phone"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo?.phone || 'Not set'}</Text>
              )}
            </View>
            <View style={styles.divider} />

            {/* Email (Read-only) */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email 🔒</Text>
              <Text style={[styles.infoValue, styles.readOnly]}>{userInfo?.email || 'Not set'}</Text>
            </View>
          </View>
        </View>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1950, 0, 1)}
          />
        )}

        {/* Gender Modal */}
        <Modal
          visible={showGenderModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowGenderModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowGenderModal(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setEditedInfo({ ...editedInfo, gender: 'Male' });
                  setShowGenderModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>👨 Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setEditedInfo({ ...editedInfo, gender: 'Female' });
                  setShowGenderModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>👩 Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalOption, styles.modalCancel]}
                onPress={() => setShowGenderModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Child Info Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Child Information</Text>
          <View style={styles.card}>
            <View style={styles.childHeader}>
              <View style={styles.childAvatar}>
                <Text style={styles.childAvatarText}>👧</Text>
              </View>
              <View style={styles.childInfo}>
                <Text style={styles.childName}>Emma Johnson</Text>
                <Text style={styles.childGrade}>5th Grade • Section A</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>10 years old</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Class Teacher</Text>
              <Text style={styles.infoValue}>Mrs. Anderson</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>School</Text>
              <Text style={styles.infoValue}>Greenwood Elementary</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Bus Number</Text>
              <Text style={styles.infoValue}>Bus #42 - Route A</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Pickup Time</Text>
              <Text style={styles.infoValue}>7:15 AM</Text>
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>🔔</Text>
            <Text style={styles.settingsText}>Notification Settings</Text>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>🔐</Text>
            <Text style={styles.settingsText}>Privacy & Security</Text>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>❓</Text>
            <Text style={styles.settingsText}>Help & Support</Text>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>ℹ️</Text>
            <Text style={styles.settingsText}>About Busflix</Text>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#E50914', '#B20710']}
            style={styles.logoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#f0f4ff',
  },
  editIcon: {
    fontSize: 20,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  childAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  childAvatarText: {
    fontSize: 32,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  childGrade: {
    fontSize: 14,
    color: '#666',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingsArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 20,
  },
  guestAvatar: {
    backgroundColor: '#999',
  },
  guestBadge: {
    marginTop: 8,
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#E50914',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    padding: 0,
  },
  pickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  placeholder: {
    color: '#999',
    fontWeight: '400',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  readOnly: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalCancel: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#E50914',
    textAlign: 'center',
    fontWeight: '600',
  },
});
