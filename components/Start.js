// Import required modules from React and React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';

// Firebase authentication
import { getAuth, signInAnonymously } from 'firebase/auth';

// For saving data locally (optional, though not currently used)
import AsyncStorage from "@react-native-async-storage/async-storage";

const Start = ({ navigation }) => {
  // State to hold user's entered name
  const [name, setName] = useState('');
  
  // State to hold selected background color
  const [selectedColor, setSelectedColor] = useState('#fff');

  // Initialize Firebase authentication
  const auth = getAuth();

  // Function to handle anonymous sign-in
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        if (result.user) {
          const userId = result.user.uid;

          // Notify user of successful login
          Alert.alert("Sign-in Successful", `Welcome, ${name || 'Anonymous'}`);

          // Navigate to Chat screen with user data
          navigation.navigate('Chat', {
            name: name || 'Anonymous',
            userId: userId,
            backgroundColor: selectedColor,
          });
        }
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
        Alert.alert('Unable to sign in. Please try again later.');
      });
  };

  // Function to set selected background color
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    // Background image with color overlay
    <ImageBackground
      source={require('../assets/Background Image.png')} // Make sure the image exists in assets
      style={[styles.background, { backgroundColor: selectedColor }]}
    >
      <View style={styles.container}>
        {/* Title of the app */}
        <Text style={styles.title}>Welcome to ChatApp</Text>

        {/* Input for user name */}
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        {/* Button to sign in and navigate to Chat */}
        <TouchableOpacity style={styles.button} onPress={signInUser}>
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>

        {/* Color picker section */}
        <Text style={styles.colorTitle}>Choose a background color:</Text>

        <View style={styles.colorOptions}>
          {['#fff', '#f8b400', '#ff6b6b', '#1e90ff', '#32cd32'].map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorCircle, { backgroundColor: color }]}
              onPress={() => handleColorSelect(color)}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

// Style definitions for all UI elements
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.85)', // Semi-transparent overlay
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  colorTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Start;
