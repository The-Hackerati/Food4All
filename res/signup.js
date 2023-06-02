import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-vWKWiTqYfYwjIIcd_1W1_BLSuibzTb4",
    authDomain: "food4all-427ea.firebaseapp.com",
    projectId: "food4all-427ea",
    storageBucket: "food4all-427ea.appspot.com",
    messagingSenderId: "842713498087",
    appId: "1:842713498087:web:3e5baf4e9a169d0a23bd42"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const registerBtn = document.getElementById('registe-button');
const loginBtn = document.getElementById('login-button');
const email = document.getElementById('email');
const name = document.getElementById('name');
const phoneNo = document.getElementById('number');


