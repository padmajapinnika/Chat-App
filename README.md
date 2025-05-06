<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App - React Native</title>
</head>
<body>
    <h1>Chat App - React Native</h1>
    <p>This is a real-time chat application built using <strong>React Native</strong>, <strong>Firebase</strong>, and <strong>Expo</strong>. The app supports image sharing, location sharing, and real-time messaging. Follow the steps below to set up the app locally and get it running.</p>

    <h2>Prerequisites</h2>
    <p>Before you begin, ensure you have the following installed:</p>
    <ul>
        <li><strong>Node.js</strong> (v16 or higher) - <a href="https://nodejs.org/">Download Node.js</a></li>
        <li><strong>Expo CLI</strong> - <a href="https://docs.expo.dev/get-started/installation/">Install Expo CLI</a></li>
        <li><strong>Android Studio</strong> (for Android emulator) - <a href="https://developer.android.com/studio">Install Android Studio</a></li>
        <li><strong>Xcode</strong> (for iOS simulator) - <a href="https://developer.apple.com/xcode/">Install Xcode</a></li>
        <li><strong>Firebase account</strong> - <a href="https://console.firebase.google.com/">Create a Firebase project</a></li>
    </ul>

    <h2>Step 1: Clone the repository</h2>
    <p>Clone the project to your local machine using the following command:</p>
    <pre><code>git clone https://github.com/yourusername/chat-app.git

cd chat-app</code></pre>

    <h2>Step 2: Install dependencies</h2>
    <p>Install the necessary dependencies using npm or yarn. Run the following command in your project directory:</p>
    <pre><code>npm install</code></pre>
    <p>or, if you're using yarn:</p>
    <pre><code>yarn install</code></pre>
    <p>This will install the required libraries to run the chat app.</p>

    <h2>Step 3: Set up Firebase</h2>
    <h3>3.1 Firebase Project Setup</h3>
    <ol>
        <li>Go to <a href="https://console.firebase.google.com/">Firebase Console</a>.</li>
        <li>Create a new project or use an existing one.</li>
        <li>Enable Firebase Firestore and Firebase Storage.</li>
        <li>Generate Firebase credentials (API keys, database URL, etc.) from the Firebase console.</li>
    </ol>

    <h3>3.2 Add Firebase Credentials to Your App</h3>
    <ol>
        <li>In your Firebase console, go to <strong>Project Settings</strong> > <strong>General</strong>.</li>
        <li>Under <strong>Your apps</strong>, select <strong>Web</strong> and copy the Firebase config.</li>
    </ol>

    <h3>3.3 Add Firebase Config to Your Project</h3>
    <p>Create a new file called <code>firebaseConfig.js</code> in your <strong>src</strong> directory (or wherever appropriate) and paste the Firebase configuration:</p>
    <pre><code>import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_STORAGE_BUCKET",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
</code></pre>
<p>Make sure to replace the placeholders (<code>YOUR_API_KEY</code>, <code>YOUR_PROJECT_ID</code>, etc.) with your actual Firebase credentials.</p>

    <h2>Step 4: Set up the Expo development environment</h2>
    <p>If you don't have Expo installed, run the following command to install Expo CLI globally:</p>
    <pre><code>npm install -g expo-cli</code></pre>

    <h3>4.1 Start the App</h3>
    <p>Once everything is set up, run the following command to start the Expo development server:</p>
    <pre><code>expo start</code></pre>
    <p>This will open up a browser window with options to run the app either on an Android emulator, iOS simulator, or physical device.</p>

    <h3>4.2 Android Setup</h3>
    <p>If you're developing for Android, you'll need <strong>Android Studio</strong>:</p>
    <ol>
        <li>Open <strong>Android Studio</strong> and install the necessary SDKs.</li>
        <li>Set up an Android emulator, or connect your physical Android device via USB (enable Developer Mode and USB debugging).</li>
        <li>Use <code>expo start</code> to launch the app in the Android emulator or on your device.</li>
    </ol>

    <h3>4.3 iOS Setup</h3>
    <p>For iOS development, you'll need <strong>Xcode</strong>:</p>
    <ol>
        <li>Open <strong>Xcode</strong> and make sure you have the latest version.</li>
        <li>Set up an iOS simulator or use a physical iOS device.</li>
        <li>Use <code>expo start</code> to launch the app on the iOS simulator or on your device.</li>
    </ol>

    <h2>Step 5: Additional Libraries to Install</h2>
    <p>Below are the additional libraries that you will need for various features in the app:</p>
    <ul>
        <li><strong>Firebase libraries</strong>:
            <pre><code>npm install firebase</code></pre>
        </li>
        <li><strong>React Native libraries</strong> for image picker, location, and action sheets:
            <pre><code>expo install expo-image-picker</code></pre>
            <pre><code>expo install expo-location</code></pre>
            <pre><code>npm install @expo/react-native-action-sheet</code></pre>
        </li>
        <li><strong>React Native Gifted Chat</strong>: For the chat UI component.
            <pre><code>npm install react-native-gifted-chat</code></pre>
        </li>
        <li><strong>AsyncStorage</strong>: For caching messages locally when offline.
            <pre><code>npm install @react-native-async-storage/async-storage</code></pre>
        </li>
        <li><strong>React Navigation</strong>: For navigation between screens in the app (if needed).
            <pre><code>npm install @react-navigation/native @react-navigation/stack</code></pre>
            <pre><code>npm install react-native-gesture-handler react-native-reanimated</code></pre>
        </li>
    </ul>

    <h2>Step 6: Running on Device or Emulator</h2>
    <p>1. To run the app on an Android emulator or a physical Android device:</p>
    <pre><code>expo start --android</code></pre>

    <p>2. To run the app on an iOS simulator or a physical iOS device:</p>
    <pre><code>expo start --ios</code></pre>

    <h2>Troubleshooting</h2>
    <p>If Firebase credentials are incorrect: Make sure you've added the correct Firebase credentials in <code>firebaseConfig.js</code>.</p>
    <p>Missing Permissions: Ensure the necessary permissions (camera, location, etc.) are requested from the user when required.</p>
    <p>Android Emulator Not Working: Check that Android Studio is set up correctly and the AVD is running.</p>

    <h2>Contributing</h2>
    <p>If you'd like to contribute to the development of this app, feel free to fork this repository and submit a pull request with your changes. Please ensure your code follows the existing style guidelines.</p>

    <h2>License</h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
