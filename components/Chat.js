// Import necessary React and React Native components
import React, { useState, useEffect } from 'react';  // React hooks for managing state and lifecycle
import { Bubble, GiftedChat } from "react-native-gifted-chat";  // Import GiftedChat and Bubble for chat UI components
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';  // Basic components for styling and platform handling

const Chat = ({ route, navigation }) => {
  // Destructure name and backgroundColor from route params passed to this screen
  const { name, backgroundColor } = route.params;

  // Create a state variable 'messages' to store chat messages
  const [messages, setMessages] = useState([]);

  // Function to send new messages and update the messages state
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));  // Append new messages to the existing ones
  };

  // Custom function to render chat message bubbles with different styles for sent and received messages
  const renderBubble = (props) => {
    return <Bubble
      {...props}  // Spread props to maintain the default functionality
      wrapperStyle={{
        // Style for sent messages (on the right)
        right: {
          backgroundColor: "#000",  // Black background for sent messages
        },
        // Style for received messages (on the left)
        left: {
          backgroundColor: "#FFF",  // White background for received/system messages
        }
      }}
    />
  };

  // useEffect hook to set initial chat messages when the component mounts
  useEffect(() => {
    setMessages([
      {
        _id: 2,  // Unique ID for this message
        text: 'You have entered the chat.',  // Text of the system message
        createdAt: new Date(),  // Timestamp for the message
        system: true,  // Mark this as a system message
      },
      {
        _id: 1,  // Unique ID for this message
        text: 'Hello developer',  // Text of the user message
        createdAt: new Date(),  // Timestamp for the message
        user: {
          _id: 2,  // Unique ID for the user who sent this message
          name: 'React Native',  // Name of the user
          avatar: 'https://placeimg.com/140/140/any',  // Placeholder avatar image URL
        },
      },
    ]);
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  // useEffect hook to set the screen title dynamically based on the 'name' from route params
  useEffect(() => {
    navigation.setOptions({ title: name });  // Set the navigation bar title to the passed 'name'
  }, [navigation, name]);  // Runs whenever navigation or name changes

  return (
    <View style={{ flex: 1 }}>
      {/* KeyboardAvoidingView to handle keyboard visibility issues on Android */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}  // Pass the current messages to GiftedChat
            renderBubble={renderBubble}  // Use custom bubble renderer
            onSend={messages => onSend(messages)}  // Handle sending new messages
            user={{ _id: 1 }}  // Current user with ID 1
          />
        </KeyboardAvoidingView>
      ) : (
        // For iOS, we render GiftedChat without keyboard handling
        <View style={[styles.container, { backgroundColor: backgroundColor || '#fff' }]}>
          <GiftedChat
            messages={messages}  // Pass the current messages to GiftedChat
            renderBubble={renderBubble}  // Use custom bubble renderer
            onSend={messages => onSend(messages)}  // Handle sending new messages
            user={{ _id: 1 }}  // Current user with ID 1
          />
        </View>
      )}
    </View>
  );
};

// Define styles using StyleSheet.create()
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Make the container take up all available space
  },
});

export default Chat;  // Export the Chat component for use in other parts of the app
