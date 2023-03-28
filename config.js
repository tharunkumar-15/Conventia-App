import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore'
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdIfRmlydMT5eyHXj-7UKZ7kPahCJVcBo",
  authDomain: "conventia-application.firebaseapp.com",
  databaseURL: "https://conventia-application-default-rtdb.firebaseio.com",
  projectId: "conventia-application",
  storageBucket: "conventia-application.appspot.com",
  messagingSenderId: "67422949635",
  appId: "1:67422949635:web:4aece0e9e0af9744479936"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig)
export const auth=getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
})
