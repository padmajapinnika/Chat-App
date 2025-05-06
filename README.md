<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatApp</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        header {
            background-color: #20232A;
            color: #61DAFB;
            text-align: center;
            padding: 1rem;
        }
        h1 {
            margin: 0;
        }
        h2 {
            color: #20232A;
        }
        ul {
            list-style-type: none;
            padding-left: 0;
        }
        li {
            margin-bottom: 10px;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 5px;
            border-radius: 4px;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .badge {
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <header>
        <h1>ChatApp</h1>
        <p><i>Connect with friends, family, or fellow developers anytime, anywhere!</i></p>
    </header>

    <main>
        <section>
            <h2>🚀 Project Description</h2>
            <p>This application provides users with a sleek chat interface and options to share images and their location. Built using React Native, this cross-platform app works on both Android and iOS devices with a single codebase!</p>

            <h3>✨ Key Features</h3>
            <ul>
                <li>🎨 <strong>Personalized UI</strong> - Choose your chat background image for a customized experience</li>
                <li>💬 <strong>Real-time Chat</strong> - Exchange messages with friends and family instantly</li>
                <li>📷 <strong>Image Sharing</strong> - Send photos from your camera or library</li>
                <li>🗺️ <strong>Location Sharing</strong> - Let others know where you are with a tap</li>
                <li>📱 <strong>Offline Access</strong> - Read your conversations even without internet connection</li>
                <li>♿ <strong>Accessibility</strong> - Fully compatible with screen readers</li>
            </ul>

            <h3>👤 User Stories</h3>
            <ul>
                <li>✅ As a new user, I want to <strong>easily enter a chat room</strong> so I can quickly start talking to my friends and family</li>
                <li>✅ As a user, I want to <strong>send messages</strong> to exchange the latest news</li>
                <li>✅ As a user, I want to <strong>send images</strong> to show what I'm currently doing</li>
                <li>✅ As a user, I want to <strong>share my location</strong> with friends</li>
                <li>✅ As a user, I want to <strong>read messages offline</strong> so I can reread conversations anytime</li>
                <li>✅ As a user with a visual impairment, I want the app to be <strong>compatible with screen readers</strong></li>
            </ul>
        </section>

        <section>
            <h2>🛠️ Technologies Used</h2>
            <h3>Frontend</h3>
            <ul>
                <li>React Native - Core framework</li>
                <li>Expo - Development platform</li>
                <li>React Navigation - Navigation between screens</li>
                <li>Expo Image Picker - Camera and image library access</li>
                <li>Expo Location - Location services</li>
                <li>React Native Maps - Map display for location sharing</li>
            </ul>

            <h3>Backend & Storage</h3>
            <ul>
                <li>Google Firestore Database - Real-time message storage</li>
                <li>Google Firebase Authentication - Anonymous user authentication</li>
                <li>Firebase Cloud Storage - Storage for images</li>
                <li>AsyncStorage - Offline data persistence</li>
            </ul>
        </section>

        <section>
            <h2>⚙️ Setup and Installation</h2>
            <h3>Prerequisites</h3>
            <ul>
                <li>📦 Node.js</li>
                <li>🧰 Expo CLI</li>
                <li>📱 Expo Go app (for physical device testing)</li>
                <li>🤖 Android Studio (for Android Emulator)</li>
                <li>🍎 Xcode (for iOS Simulator, Mac only)</li>
                <li>🔥 Firebase Account</li>
            </ul>

            <h3>Installation Steps</h3>
            <ol>
                <li>Clone the repository:
                    <pre><code>git clone https://github.com/padmajapinnika/chat-app.git</code></pre>
                </li>
                <li>Navigate to the project directory:
                    <pre><code>cd chat-app</code></pre>
                </li>
                <li>Install dependencies:
                    <pre><code>npm install</code></pre>
                </li>
                <li>Firebase Setup:
                    <ul>
                        <li>Create a Firebase project at <a href="https://firebase.google.com">firebase.google.com</a></li>
                        <li>Enable Firestore Database</li>
                        <li>Enable Firebase Authentication (Anonymous)</li>
                        <li>Enable Firebase Storage</li>
                        <li>Set Storage security rules to allow authenticated reads and writes:</li>
                        <pre><code>
                            rules_version = '2';
                            service firebase.storage {
                              match /b/{bucket}/o {
                                match /{allPaths=**} {
                                  allow read, write: if request.auth != null;
                                }
                              }
                            }
                        </code></pre>
                        <li>Get your Firebase configuration details and update them in App.js.</li>
                    </ul>
                </li>
                <li>Install required dependencies:
                    <pre><code>expo install @react-navigation/native @react-navigation/native-stack</code></pre>
                    <pre><code>expo install @react-native-async-storage/async-storage</code></pre>
                    <pre><code>expo install @react-native-community/netinfo</code></pre>
                    <pre><code>expo install expo-image-picker</code></pre>
                    <pre><code>expo install expo-location</code></pre>
                    <pre><code>expo install react-native-maps</code></pre>
                    <pre><code>expo install @expo/react-native-action-sheet</code></pre>
                    <pre><code>npm install firebase</code></pre>
                </li>
                <li>Start the Expo development server:
                    <pre><code>npx expo start</code></pre>
                </li>
                <li>Run on your preferred platform:
                    <ul>
                        <li>📱 Scan the QR code with Expo Go (Android) or Camera app (iOS)</li>
                        <li>🤖 Press 'a' to launch on Android Emulator</li>
                        <li>🍎 Press 'i' to launch on iOS Simulator (Mac only)</li>
                    </ul>
                </li>
            </ol>
        </section>

        <section>
            <h2>🎯 Implemented Features</h2>
            <h3>Start Screen</h3>
            <ul>
                <li>📝 User name input field</li>
                <li>🎨 Background color selection (4 options)</li>
                <li>▶️ "Start Chatting" button to enter the chat</li>
                <li>🔐 Anonymous authentication with Firebase</li>
            </ul>

            <h3>Chat Screen</h3>
            <ul>
                <li>👤 User's name displayed in navigation bar</li>
                <li>🎨 Custom background color based on selection</li>
                <li>💬 Real-time messaging with Firestore</li>
                <li>📸 Image sharing (camera and library)</li>
                <li>📍 Location sharing with interactive maps</li>
                <li>🔄 Network connectivity detection</li>
                <li>📴 Offline message caching with AsyncStorage</li>
                <li>♿ Accessibility support for screen readers</li>
            </ul>
        </section>

      <section>
    <h2>📄 License</h2>
    <p>This project is licensed under the MIT License. Find out more at <a href="https://github.com/padmajapinnika/chat-app">GitHub - padmajapinnika/chat-app</a></p>

</section>

    </main>

</body>
</html>
