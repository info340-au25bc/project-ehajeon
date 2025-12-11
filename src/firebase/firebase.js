import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYp7aF80Fi8jWkwT2Y_3XCsN5hg6jhUQg",
  authDomain: "ehajeon-eg.firebaseapp.com",
  databaseURL: "https://ehajeon-eg-default-rtdb.firebaseio.com",
  projectId: "ehajeon-eg",
  storageBucket: "ehajeon-eg.firebasestorage.app",
  messagingSenderId: "88299268052",
  appId: "1:88299268052:web:65d9500298d55c9f501841"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };