import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Mdrw2z3k2gEzAZE-c5DWGUPB_pyUk2c",
  authDomain: "projetfinalreactnative.firebaseapp.com",
  projectId: "projetfinalreactnative",
  storageBucket: "projetfinalreactnative.appspot.com",
  messagingSenderId: "654305382297",
  appId: "1:654305382297:web:592a3d1e18947553d30d08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// Initialiser Firestore
export const db = getFirestore(app);
