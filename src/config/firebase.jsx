import firebaseApp from 'firebase/app';
import  'firebase/auth';
import  'firebase/database';
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyBb8cXwjGDOx3dIwYDlnfoWJjFQpSYD9tk",
  authDomain: "e-commerce-f5ddc.firebaseapp.com",
  projectId: "e-commerce-f5ddc",
  storageBucket: "e-commerce-f5ddc.appspot.com",
  messagingSenderId: "907326868599",
  appId: "1:907326868599:web:825cdc7cd6e55c70f80a72",
  measurementId: "G-JXNTCLT1DB"
};
 

  firebaseApp.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();
  const database=firebaseApp.database();
  const Storage=firebaseApp.storage();

export {auth,database,Storage};