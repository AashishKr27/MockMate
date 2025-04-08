/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQHfzihTGoEMOXq149S6rnOgQ_16_LVGo",
  authDomain: "mockmate-7eda7.firebaseapp.com",
  projectId: "mockmate-7eda7",
  storageBucket: "mockmate-7eda7.firebasestorage.app",
  messagingSenderId: "418367349161",
  appId: "1:418367349161:web:c883fd9e9d17d2bc0924b8",
  measurementId: "G-P2G27Q2D7X"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);