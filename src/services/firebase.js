// src/services/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBnjo6Ir4Bgfj_xZZn35g0mwUoNVKpZaek",
  authDomain: "zentroverse-otp.firebaseapp.com",
  projectId: "zentroverse-otp",
  storageBucket: "zentroverse-otp.appspot.com",
  messagingSenderId: "278577699343",
  appId: "1:278577699343:web:14b7ca93722de36972a17a",
  measurementId: "G-PHG4HFLB6N",
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Properly initialize reCAPTCHA only once
export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container", // must exist in your HTML
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      }
    );
  }
};

// ✅ Send OTP safely
export const sendOtp = async (phoneNumber) => {
  setupRecaptcha();
  const appVerifier = window.recaptchaVerifier;
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};
