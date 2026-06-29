// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBinpc369ITfoZ-3Q8-zIczHXnr5SVWvY",
  authDomain: "jharkhand-jobs-solution-47382.firebaseapp.com",
  projectId: "jharkhand-jobs-solution-47382",
  storageBucket: "jharkhand-jobs-solution-47382.firebasestorage.app",
  messagingSenderId: "155478614596",
  appId: "1:155478614596:web:274c4bd34320c858dd1211",
  measurementId: "G-7N6MQGBNDP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase Connected");
