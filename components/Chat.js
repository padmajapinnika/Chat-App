// Import necessary React and React Native components
import React, { useState, useEffect } from 'react'; // React hooks for managing state and lifecycle
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat"; // GiftedChat and Bubble for chat UI
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, query, onSnapshot, orderBy, addDoc } from 'firebase/firestore'; // Firebase Firestore imports
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Chat = ({ route, navigation, db, isConnected }) => {
  // Destructure name and backgroundColor from route params passed to this screen
  const { name, userId, backgroundColor } = route.params; // Use 'userId' instead of 'userID'

  if (!userId) {
    console.error("User ID is missing in Chat component");
    return null;  // Return early if no userId is available
  }
  
  // State for messages
  const [messages, setMessages] = useState([]);

  // Fetch messages from Firestore in real time
  useEffect(() => {
    const loadMessages = async () => {
      if (isConnected) {
        const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(messagesQuery, async(querySnapshot) => {
          const messagesFirestore = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              _id: doc.id,
              text: data.text || '',
              createdAt: data.createdAt?.toDate(), // Convert Firestore Timestamp to JS Date
              user: data.user || {},
              system: data.system || false,
            };
          });
          setMessages(messagesFirestore);
          try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesFirestore));
          } catch (error) {
            console.error('Error saving messages to AsyncStorage:', error);
          }
        });
        return () => unsubscribe(); // Cleanup listener on unmount
      } else {
        // If not connected, load messages from AsyncStorage
        try {
          const cachedMessages = await AsyncStorage.getItem('messages');
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          }
        } catch (error) {
          console.error('Error loading messages from AsyncStorage:', error);
        }
      }
    };

    loadMessages();
  }, [isConnected, db]);

  const onSend = async (newMessages) => {
    if (!userId) {
      console.error("User ID is missing!");
      return;  // Do not proceed if userId is undefined
    }
  
    const message = {
      ...newMessages[0],
      createdAt: new Date(),
      user: {
        _id: userId,  // Ensure userId is not undefined
        name: name,
      },
    };
  
    try {
      // Add message to Firestore
      await addDoc(collection(db, "messages"), message);
    } catch (error) {
      // Catch and log any errors that occur during document addition
      console.error("Error adding document: ", error);
    }
  };
  
  // Custom styling for chat bubbles
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" },
        left: { backgroundColor: "#FFF" }
      }}
    />
  );

  // Custom InputToolbar for when offline
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;  // Return null if offline
    }
  };

  // Set the screen title
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}  // Pass the custom renderInputToolbar
            onSend={onSend}
            user={{ _id: userId, name: name }} // Use 'userId' here
          />
        </KeyboardAvoidingView>
      ) : (
        <View style={[styles.container, { backgroundColor: backgroundColor || '#fff' }]}>
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}  // Pass the custom renderInputToolbar
            onSend={onSend}
            user={{ _id: userId, name: name }} // Use 'userId' here
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
