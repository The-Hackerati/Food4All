import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-vWKWiTqYfYwjIIcd_1W1_BLSuibzTb4",
    authDomain: "food4all-427ea.firebaseapp.com",
    projectId: "food4all-427ea",
    storageBucket: "food4all-427ea.appspot.com",
    messagingSenderId: "842713498087",
    appId: "1:842713498087:web:3e5baf4e9a169d0a23bd42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const registerBtn = document.getElementById('register-button');
const loginBtn = document.getElementById('login-button');

registerBtn.addEventListener('click', function(event) {
//   event.preventDefault();
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const phoneNo = document.getElementById('number').value;

  var isVerified = true; // Implement verification logic or replace with appropriate condition
  if (isVerified) {
    signInWithPopup(auth, provider)
    .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    window.alert("User registered successfully");
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    window.alert("Error: " + errorMessage);
    // ...
  });
  }
});
