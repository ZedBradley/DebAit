// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIce5MFZ2uRip7pVrZ6AiD8qoaN0lUWN4",
  authDomain: "myaiapp-8f339.firebaseapp.com",
  projectId: "myaiapp-8f339",
  storageBucket: "myaiapp-8f339.appspot.com",
  messagingSenderId: "478426083764",
  appId: "1:478426083764:web:8382f4e94d808e658082e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export them so you can import elsewhere
export { app, auth };