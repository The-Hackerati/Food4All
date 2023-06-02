import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


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
const db = getDatabase();

const registerBtn = document.getElementById('register-button');
const loginBtn = document.getElementById('login-button');

registerBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const phoneNo = document.getElementById('number').value;
    const checkbox = document.getElementById('checkbox');

    var isVerified = true;

    if (validate_field(name) == false || validate_field(phoneNo) == false) {
        window.alert("Please fill all the fields");
        isVerified = false;
        return;
    }
    if (!validate_email(email)) {
        window.alert("Invalid email address");
        isVerified = false;
        return;
    }
    if (!validate_phoneNum(phoneNo)) {
        window.alert("Invalid phone number");
        isVerified = false;
        return;
    }
    if (!checkbox.checked) {
        window.alert("Please accept the terms and conditions");
        isVerified = false;
        return;
    }


    if (isVerified) {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                const reference = ref(db, "users/" + user.uid);
                window.alert("User registered successfully");
                set(reference, {
                    name: name,
                    email: email,
                    phoneNo: phoneNo,
                    last_login: Date.now(),
                })
                    .then(() => {
                        // signOut(auth)
                        window.alert("User registered successfully and data gets written to the database");
                        // window.location.href = "./../index.html";
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode + " " + errorMessage);
                        window.alert("Error: " + errorMessage);
                    });


            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + " " + errorMessage);
                window.alert("Error: " + errorMessage);
            });
    }
});

loginBtn.addEventListener('click', function (event) {
    event.preventDefault();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.alert("Welcome Back!");
            // window.location.href = "./../index.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
            window.alert("Error: " + errorMessage);
        });
});



//validate functions
function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
        return true;
    } else {
        return false;
    }
}


function validate_field(field) {
    if (field == null) {
        return false;
    }
    if (field.length <= 0) {
        return false
    }
    else {
        return true;
    }
}
function validate_phoneNum(phoneNo) {
    var expression = /^\d{10}$/;
    if (expression.test(phoneNo) == true) {
        return true;
    } else {
        return false;
    }
}