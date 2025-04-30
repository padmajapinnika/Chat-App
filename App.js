// Import React and necessary components from React Native and Expo
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Import navigation containers and stack navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import custom components (screens)
import Start from './components/Start';
import Chat from './components/Chat';

// Create a native stack navigator instance
const Stack = createNativeStackNavigator();

// Main App component
const App = () => {
  return (
    // Wrap the navigation structure in a NavigationContainer
    <NavigationContainer>
      {/* Define the stack navigator with two screens */}
      <Stack.Navigator initialRouteName="Start">
        {/* Start screen is the first screen the user sees */}
        <Stack.Screen name="Start" component={Start} />
        
        {/* Chat screen will be navigated to from Start */}
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export the App component as the default export
export default App;