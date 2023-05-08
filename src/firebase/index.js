// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCCC9gGb9qPJotQ4FJiobzp1wj-5bxQ_c",
  authDomain: "formsidos.firebaseapp.com",
  projectId: "formsidos",
  storageBucket: "formsidos.appspot.com",
  messagingSenderId: "801624088478",
  appId: "1:801624088478:web:656a6b8d37e9b92ccf008f",
  measurementId: "G-XBDL2MSD3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const dbFs = getFirestore(app);

export default dbFs;
