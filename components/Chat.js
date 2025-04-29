// Import necessary React and React Native components
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }) => {
  // Destructure parameters passed from the Start screen
  const { name, backgroundColor } = route.params;

  // Set the header title to the user's name when the component mounts
  useEffect(() => {
    navigation.setOptions({ title: name }); // Updates the navigation bar title
  }, [navigation, name]);

  return (
    // Set the background color dynamically based on the selected color
    <View style={[styles.container, { backgroundColor: backgroundColor || '#fff' }]}>
      <Text style={styles.text}>Hello, {name}! Welcome to the chat.</Text>
    </View>
  );
};

// Define styles for the Chat screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
  text: {
    fontSize: 24,
    color: '#333', // Dark grey text for readability
  },
});

export default Chat;
