// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc  } from 'firebase/firestore';
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
export const db = getFirestore(app);
export const auth = getAuth();

export const createUser = async (email, password) => {
  const creds = await createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user

    const res = await setDoc(doc(db, "users", user.uid ),({
      cart: {}
    }));
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`Error ${errorCode}:\n ${errorMessage}`)
  });
  return creds;
}
export const signIn = async (email, password) => {
  const creds = await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`Error ${errorCode}:\n ${errorMessage}`)
  });
  return creds;
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("Logout exitoso");
    })
    .catch((error) => {
      console.log("Error al hacer logout:", error);
    });
}
