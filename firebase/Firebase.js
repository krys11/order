// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKnuVSSdXS8aZZDR5cceVIbIRfjPqW3Yg",
  authDomain: "vente-6c18a.firebaseapp.com",
  projectId: "vente-6c18a",
  storageBucket: "vente-6c18a.appspot.com",
  messagingSenderId: "1009726195954",
  appId: "1:1009726195954:web:c039231142e74f5e77286b",
  measurementId: "G-3CKQ98N6SX",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

//save User Data
const setCollectionData = async (collectionName, userID, data) => {
  const ref = doc(db, `${collectionName}/${userID}`);
  return await setDoc(ref, data);
};

//get User Data
const getUserData = async (userID) => {
  const ref = doc(db, `users/${userID}`);
  return await getDoc(ref);
};

//update User Data
const updateUserData = async (userID, updateData) => {
  const ref = doc(db, `users/${userID}`);
  return await updateDoc(ref, updateData);
};

//update Admin Data
const updateAdminData = async (userID, updateData) => {
  const ref = doc(db, `admin/${userID}`);
  return await updateDoc(ref, updateData);
};

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
  app,
  onRegister,
  onLogin,
  onSendEmailVerification,
  onResetPassword,
  onSignOut,
  setCollectionData,
  getUserData,
  updateUserData,
  updateAdminData,
  db,
};
