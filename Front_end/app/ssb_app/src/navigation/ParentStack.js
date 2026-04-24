import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ParentHome from '../screens/parent/ParentHome';
import ParentMap from '../screens/parent/ParentMap';
import ParentNotifications from '../screens/parent/ParentNotifications';
import ParentProfile from '../screens/parent/ParentProfile';

const Tab = createBottomTabNavigator();

export default function ParentStack() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../../assets/icons/HomeIcon.png');
          } else if (route.name === 'Map') {
            iconSource = require('../../assets/icons/MapIcon.png');
          } else if (route.name === 'Notifications') {
            iconSource = require('../../assets/icons/NotificationsIcon.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../../assets/icons/AccountIcon.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 65 + insets.bottom : 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={ParentHome}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Map" 
        component={ParentMap}
        options={{ tabBarLabel: 'Map' }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={ParentNotifications}
        options={{ tabBarLabel: 'Alerts' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ParentProfile}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
