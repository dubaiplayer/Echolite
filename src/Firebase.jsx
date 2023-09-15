import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAflvIMAFd2DBuDb6JZ3VnnYX9i3GAHyHo",
  authDomain: "echolite-4bea4.firebaseapp.com",
  projectId: "echolite-4bea4",
  storageBucket: "echolite-4bea4.appspot.com",
  messagingSenderId: "392890939507",
  appId: "1:392890939507:web:8b0af2ed0311addc699206",
  measurementId: "G-MNKRLBVHK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)