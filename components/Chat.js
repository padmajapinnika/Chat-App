import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps"; 

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const { userId, name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });

    let unsubscribe;

    // Load cached messages from AsyncStorage for offline support
    const loadCachedMessages = async () => {
      try {
        const cachedMessages = await AsyncStorage.getItem("messages");
        if (cachedMessages) {
          setMessages(JSON.parse(cachedMessages));
        }
      } catch (error) {
        console.error("Failed to load messages from cache:", error);
      }
    };

    if (isConnected) {
      // Create query to get messages in descending order
      const messagesQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      // Subscribe to real-time updates from Firestore
      unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
        const messagesList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
        });

        setMessages(messagesList);

        // Cache the latest messages locally
        try {
          await AsyncStorage.setItem("messages", JSON.stringify(messagesList));
        } catch (error) {
          console.error("Failed to cache messages:", error);
        }
      });
    } else {
      // If offline, load messages from local cache
      loadCachedMessages();
    }

    // Cleanup Firestore subscription
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [db, isConnected, name, navigation]);

  // Send new message to Firestore
  const onSend = (newMessages) => {
    if (isConnected) {
      addDoc(collection(db, "messages"), {
        ...newMessages[0], 
        createdAt: serverTimestamp(),
        user: {
          _id: userId,
          name: name,
        }
      });
    } else {
      alert("You're offline. Messages will be sent when you're back online.");
    }
  };

  // Customize message bubble appearance
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" },
        left: { backgroundColor: "#FFF" },
      }}
    />
  );

  // Conditionally render input toolbar only when online
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  };

  // Provide custom action buttons (e.g., send image, location)
  const renderCustomActions = (props) => {
    return <CustomActions {...props} onSend={onSend} storage={storage} userID={userId} />;
  };
  
  // Render map preview for messages with location data
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={styles.mapView}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions} 
        renderCustomView={renderCustomView} 
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
          name: name,
        }}
      />
      {/* Adjust view for keyboard on different platforms */}
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapView: { width: 200, height: 150, borderRadius: 10, margin: 5 },
});

export default Chat;
