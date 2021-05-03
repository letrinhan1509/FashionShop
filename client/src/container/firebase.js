import firebase from "@firebase/app";
import "@firebase/storage";


var firebaseConfig = {
  apiKey: "AIzaSyBuvMsY6qXN0XOR2pjo9g0YJ9JC5yfh9rE",
  authDomain: "fashionshop-11d42.firebaseapp.com",
  projectId: "fashionshop-11d42",
  storageBucket: "fashionshop-11d42.appspot.com",
  messagingSenderId: "502681458242",
  appId: "1:502681458242:web:54b097c95d91cb6eab7fdb",
  measurementId: "G-FWTMMVNBDX"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()
 
  export  {
    storage, firebase as default
  }
  