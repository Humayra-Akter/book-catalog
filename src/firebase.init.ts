// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4XZsMzwo8GwRqA7-aaU1aJAaeVWBHsac',
  authDomain: 'book-catalog-1df18.firebaseapp.com',
  projectId: 'book-catalog-1df18',
  storageBucket: 'book-catalog-1df18.appspot.com',
  messagingSenderId: '745832901244',
  appId: '1:745832901244:web:15ec35ca89204ca800f7f9 ',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
/*
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,*/
