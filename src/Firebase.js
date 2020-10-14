import * as firebase from "firebase";
// import firestore from "firebase/firestore";

// const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyDa4naEcu3iRU1zizBV-Ym8EJwbcWhYJBc",
  authDomain: "delegueproject.firebaseapp.com",
  databaseURL: "https://delegueproject.firebaseio.com",
  projectId: "delegueproject",
  storageBucket: "delegueproject.appspot.com",
  messagingSenderId: "877358299965",
  appId: "1:877358299965:web:5362b8d893df347eb56354",
  measurementId: "G-MLK9JJKRJL",
};
firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;
