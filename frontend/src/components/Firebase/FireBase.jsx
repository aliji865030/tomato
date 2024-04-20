import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrSVcKDJZGSrR4bjMj8ygTyF3TVNcBBsA",
  authDomain: "tastetrekker-ec05b.firebaseapp.com",
  projectId: "tastetrekker-ec05b",
  storageBucket: "tastetrekker-ec05b.appspot.com",
  messagingSenderId: "921553923173",
  appId: "1:921553923173:web:bb629cfcdbee1e38ca2a8c",
  measurementId: "G-DNBL3MM687",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app ,firestore};
