import { useState, useEffect } from 'react';

// Import screen components
import Start from './components/Start';
import Chat from './components/Chat';

// Import navigation tools
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import network info hook to monitor connectivity
import { useNetInfo } from '@react-native-community/netinfo';

// Import Firebase setup tools
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

import { Alert } from "react-native";

// Create the navigator stack instance
const Stack = createNativeStackNavigator();

// Firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyCbFCcjzWnNcjP2YsP7zGdenge9pTRzjK8",
  authDomain: "chat-app-e67b0.firebaseapp.com",
  projectId: "chat-app-e67b0",
  storageBucket: "chat-app-e67b0.firebasestorage.app",
  messagingSenderId: "203404520394",
  appId: "1:203404520394:web:38c0ee5e75769885dc3d33"
};

// Initialize Firebase services (done once globally)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const App = () => {
  // Get current network connection status
  const connectionStatus = useNetInfo();

  // Monitor connection status to enable/disable Firestore network access
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db); // Disable sync when offline
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db); // Re-enable sync when back online
    }
  }, [connectionStatus.isConnected]);

  return (
    // Set up navigation structure
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        {/* Start screen: Welcome UI and options */}
        <Stack.Screen name="Start" component={Start} />
        
        {/* Chat screen: Main chat interface with props */}
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db} // Firestore instance
              isConnected={connectionStatus.isConnected} // Network status
              storage={storage} // Firebase Storage instance
              {...props} // Navigation and route props
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export App as the root component
export default App;
