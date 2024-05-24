import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { getStorage } from 'firebase/storage';

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
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, ref, set, get, child, storage };
