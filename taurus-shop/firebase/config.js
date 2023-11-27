// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtSVZK12m7TtC_BPlRCmy7oc-7_OJKP8U",
  authDomain: "coderecommerce-app.firebaseapp.com",
  projectId: "coderecommerce-app",
  storageBucket: "coderecommerce-app.appspot.com",
  messagingSenderId: "723295172185",
  appId: "1:723295172185:web:c33b6606930c35f39fe348"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);