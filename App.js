import React, { useState, useEffect } from 'react';

//import { useActionSheet } from "@expo/react-native-action-sheet";
// Import navigation containers and stack navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';

// Import custom components (screens)
import Start from './components/Start';
import Chat from './components/Chat';

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

// Main App component
const App = () => {
  const netInfo = useNetInfo()
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    if (netInfo.isConnected !== null) {
      setIsConnected(netInfo.isConnected);

      if (netInfo.isConnected) {
        enableNetwork(db).catch((error) =>
          console.log('Failed to enable Firestore network:', error)
        );
      } else {
        disableNetwork(db).catch((error) =>
          console.log('Failed to disable Firestore network:', error)
        );
      }
    }
  }, [netInfo.isConnected]);
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
              isConnected={isConnected}
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
