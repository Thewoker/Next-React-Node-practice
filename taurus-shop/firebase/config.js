// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC6SxHxiKmA8-hjBwGuBZc3zwd_GLTnSc",
  authDomain: "coderecommerce-app-30074.firebaseapp.com",
  projectId: "coderecommerce-app-30074",
  storageBucket: "coderecommerce-app-30074.appspot.com",
  messagingSenderId: "256038943319",
  appId: "1:256038943319:web:4aa415742fe26bf6f04112"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage( app )
export const auth = getAuth();





