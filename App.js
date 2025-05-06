import { useState, useEffect } from 'react';
// Import custom components (screens)
import Start from './components/Start';
import Chat from './components/Chat';
//import { useActionSheet } from "@expo/react-native-action-sheet";
// Import navigation containers and stack navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

import { Alert } from "react-native";

// Create a native stack navigator instance
const Stack = createNativeStackNavigator();

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCbFCcjzWnNcjP2YsP7zGdenge9pTRzjK8",
  authDomain: "chat-app-e67b0.firebaseapp.com",
  projectId: "chat-app-e67b0",
  storageBucket: "chat-app-e67b0.firebasestorage.app",
  messagingSenderId: "203404520394",
  appId: "1:203404520394:web:38c0ee5e75769885dc3d33"
};

// Initialize Firebase outside the component to prevent reinitialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
  return (
    // Wrap the navigation structure in a NavigationContainer
    <NavigationContainer>
      {/* Define the stack navigator with two screens */}
      <Stack.Navigator initialRouteName="Start">
        {/* Start screen is the first screen the user sees */}
        <Stack.Screen name="Start" component={Start} />
        
        {/* Chat screen will be navigated to from Start */}
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              isConnected={connectionStatus.isConnected}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export the App component as the default export
export default App;