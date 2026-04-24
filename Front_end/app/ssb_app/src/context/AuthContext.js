import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

const STORAGE_KEY = '@user_data';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // DON'T auto-login on app start
  // Only load saved data when user logs in

  // Save user data whenever it changes
  useEffect(() => {
    if (userInfo && isLoggedIn) {
      saveUserData(userInfo);
    }
  }, [userInfo]);

  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setUserInfo(parsed);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log('Error clearing user data:', error);
    }
  };

  const login = async (type, googleData = null) => {
    setIsLoggedIn(true);
    
    if (type === 'guest') {
      const guestData = {
        type: 'guest',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        avatar: null,
      };
      setUserInfo(guestData);
    } else if (type === 'google') {
      // Check if we have saved data for this Google account
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // If same email, restore saved data (including avatar)
        if (parsed.email === googleData?.email) {
          setUserInfo(parsed);
          return;
        }
      }
      
      // New Google account or no saved data
      const randomDate = new Date(
        1980 + Math.floor(Math.random() * 30),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );
      
      const googleUserData = {
        type: 'google',
        firstName: googleData?.givenName || 'Google',
        lastName: googleData?.familyName || 'User',
        email: googleData?.email || 'user@gmail.com',
        phone: '',
        gender: '',
        dateOfBirth: randomDate.toISOString().split('T')[0],
        avatar: googleData?.photoUrl || null,
      };
      setUserInfo(googleUserData);
    }
  };

  const updateUserInfo = (updatedInfo) => {
    const newUserInfo = { ...userInfo, ...updatedInfo };
    setUserInfo(newUserInfo);
  };

  const logout = async () => {
    // DON'T clear user data - keep it for next login with same account
    // Only clear session state
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userInfo, 
      login, 
      logout, 
      updateUserInfo,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
