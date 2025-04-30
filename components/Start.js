// Import required modules from React and React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const Start = ({ navigation }) => {
  // State to hold the user's name
  const [name, setName] = useState('');

  // State to hold the selected background color
  const [selectedColor, setSelectedColor] = useState('#fff'); // Default color

  // Function to update the selected color
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    // Set background image with optional overlay color
    <ImageBackground
      source={require('../assets/Background Image.png')} // Make sure the path is correct
      style={[styles.background, { backgroundColor: selectedColor }]}
    >
      <View style={styles.container}>
        {/* App title */}
        <Text style={styles.title}>Welcome to ChatApp</Text>

        {/* Text input for user's name */}
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        {/* Navigation button to Chat screen with name and color passed as params */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Chat', {
            name,
            backgroundColor: selectedColor
          })}
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>

        {/* Color selection label */}
        <Text style={styles.colorTitle}>Choose a background color:</Text>

        {/* Color options displayed as circles */}
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

// Styles for layout and design
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
    backgroundColor: 'rgba(255,255,255,0.85)', // Overlay for readability
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
    borderRadius: 25, // Half of width/height to make it circular
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Start;