
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAxMjjprwo8sHH9vj3_SjjpAPKqop2qSvQ",
    authDomain: "vue-learning-eda8a.firebaseapp.com",
    projectId: "vue-learning-eda8a",
    storageBucket: "vue-learning-eda8a.appspot.com",
    messagingSenderId: "572012194101",
    appId: "1:572012194101:web:d27ef58c384d64e293047c"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init firestore service
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp
  
export { projectFirestore, timeStamp, projectAuth }