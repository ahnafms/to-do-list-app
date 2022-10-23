// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiNL0Ajsr3og2KB5iT5dfWlPEMZZBmX6I",
  authDomain: "vuejs-9f2fe.firebaseapp.com",
  projectId: "vuejs-9f2fe",
  storageBucket: "vuejs-9f2fe.appspot.com",
  messagingSenderId: "239658559478",
  appId: "1:239658559478:web:b0ef0a169f6472e7f8c9d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
export {projectFirestore}