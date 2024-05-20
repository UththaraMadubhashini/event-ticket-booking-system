// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgNlwY4ud5WAf7PlfjIsggYKame36kGh4",
  authDomain: "event-ticket-booking-sys-60ef0.firebaseapp.com",
  databaseURL: "https://event-ticket-booking-sys-60ef0-default-rtdb.firebaseio.com",
  projectId: "event-ticket-booking-sys-60ef0",
  storageBucket: "event-ticket-booking-sys-60ef0.appspot.com",
  messagingSenderId: "16796915105",
  appId: "1:16796915105:web:565bc332434abb81cf27e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authDatabase = getAuth(app);
export const database = getDatabase(app);