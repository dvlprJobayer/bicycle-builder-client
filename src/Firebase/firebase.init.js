// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhqL_hOnAfdxXwVTXDYQfxKC_NjfCY6Jc",
    authDomain: "bicycle-builder.firebaseapp.com",
    projectId: "bicycle-builder",
    storageBucket: "bicycle-builder.appspot.com",
    messagingSenderId: "670668085532",
    appId: "1:670668085532:web:4cc2d2cc9dfce6b50582d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;