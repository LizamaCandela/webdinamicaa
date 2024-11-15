// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, updateEmail, updatePassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, updateDoc, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjhSo920BpjpDoY_CKQwYG_dBSGrez-ZE",
  authDomain: "mapaturistico-b161e.firebaseapp.com",
  projectId: "mapaturistico-b161e",
  storageBucket: "mapaturistico-b161e.firebasestorage.app",
  messagingSenderId: "974532599389",
  appId: "1:974532599389:web:1683ae345c245fda30f7b4",
  measurementId: "G-09N89Y4E00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// inicializa fire base authentication
const auth = getAuth(app);
//inizializar firestore
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, updateEmail, updatePassword, updateDoc, onAuthStateChanged };


