// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth();

export const Authentication = () => {
  return FirebaseAuth;
};

export const SignIn = async (email, password) => {
  signInWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignOut = async () => {
  signOut(FirebaseAuth);
};

export const getSignInErrorMessage = (error) => {
  if (error instanceof FirebaseError) {
    // Handle Firebase specific error codes or messages
    switch (error.code) {
      case "auth/user-not-found":
        return "Akun tidak terdaftar";
      case "auth/wrong-password":
        return "Username atau password salah";
      default:
        break;
    }
  }
  return "An error occurred during sign in";
};
