# Smart School Bus - Parent App (Expo)

This workspace contains a React Native (Expo) frontend for a Smart School Bus tracking system. This is a **parent-only app** that allows parents to track their children's school bus in real-time.

## ✨ Features

### 🎨 Beautiful Login Screen
- Gradient background with blue theme
- Animated logo with spring bounce effect
- Smooth fade-in and slide animations
- Modern UI with gradient button
- Clean, light design

### 📱 Parent Dashboard Screens

#### 🏠 Home Screen
- Welcome header with parent name
- **Bus Status Card**: Real-time bus info, ETA, current location
- **Child Info Card**: Student details, grade, boarding status
- **Quick Actions**: Easy access to notifications, map, contact driver, trip history
- **Recent Trips**: History of completed journeys
- Scrollable content with beautiful card layouts

#### � Notifications Screen
- **Smart Filtering**: All, Unread, Stations tabs
- **Route Progress**: Visual progress bar showing current station (e.g., 3/6)
- **Rich Notifications**:
  - Bus arrival alerts (ETA warnings)
  - Station passing updates (each stop along the route)
  - Child boarding confirmations
  - Trip start/end notifications
- Color-coded notification types with icons
- Unread indicators
- Time stamps

#### 👤 Profile Screen
- **Avatar Management**: 
  - Tap to change photo from device gallery
  - Camera icon badge for easy access
  - Default initials avatar
- **Parent Information**: Name, phone, email, address
- **Child Information**: 
  - Name, age, grade, class
  - School details
  - Bus route and pickup time
- **Settings Options**: Notifications, Privacy, Help, About
- Beautiful gradient logout button with confirmation
- Version info

#### 🗺️ Map Screen
- Placeholder for live GPS tracking (ready for react-native-maps integration)

## 🏗️ Project Structure

What's included:
- `src/context/AuthContext.js` — simple auth provider for parent login/logout.
- `src/navigation/AuthStack.js`, `ParentStack.js` — navigation stacks for auth and parent dashboard.
- `src/screens/auth/LoginScreen.js` — beautiful animated parent login screen.
- `src/screens/parent/*` — fully designed screens (Home, Map, Notifications, Profile) for parents.
- `App.js` — main app entry with NavigationContainer.

Run notes

1. Install dependencies required for React Navigation (run from project root). These versions are compatible with Expo SDK ~54 / React Native 0.81.x used in this project:

```powershell
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```

Then install the native utilities (Expo-managed recommended):

```powershell
expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
```

Optional (only if you need advanced animations):

```powershell
expo install react-native-reanimated
```

2. Start the app (clear cache to avoid stale bundler errors):

```powershell
expo start -c
```

Notes
- Screens contain placeholders for maps — integrate `react-native-maps` or another SDK when ready.
- Auth is a simple in-memory provider for demo. Replace with real auth and persistent storage as needed.
