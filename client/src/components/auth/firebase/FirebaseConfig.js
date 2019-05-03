import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYPklj17yzONb6kAPCnGhYW90QiSJcG_g",
  authDomain: "masher-flutter.firebaseapp.com",
  databaseURL: "https://masher-flutter.firebaseio.com",
  projectId: "masher-flutter",
  storageBucket: "masher-flutter.appspot.com",
  messagingSenderId: "391431336165"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
