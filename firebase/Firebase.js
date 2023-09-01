// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAovnZJ1crT3cKUKD4QF5tzjjh33J-9WxI",
  authDomain: "order-4b768.firebaseapp.com",
  projectId: "order-4b768",
  storageBucket: "order-4b768.appspot.com",
  messagingSenderId: "139938821750",
  appId: "1:139938821750:web:2a663c8a1fcd01d4ec5157",
  measurementId: "G-PMKFX7349V",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const onRegister = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

const onLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const onSendEmailVerification = async (userCredential) => {
  return await sendEmailVerification(userCredential);
};

const onResetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

const onSignOut = async () => {
  return await signOut(auth);
};

export {
  auth,
  onRegister,
  onLogin,
  onSendEmailVerification,
  onResetPassword,
  onSignOut,
};
