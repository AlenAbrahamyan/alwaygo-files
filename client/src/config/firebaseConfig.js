import firebase from 'firebase/app';
import 'firebase/storage';


  var firebaseConfig = {
    apiKey: "AIzaSyA4sxWUpeXfslJXc4byJaTlAcEfLNd6rc4",
    authDomain: "alwaygo-f0418.firebaseapp.com",
    databaseURL: "https://alwaygo-f0418.firebaseio.com",
    projectId: "alwaygo-f0418",
    storageBucket: "alwaygo-f0418.appspot.com",
    messagingSenderId: "1055722180512",
    appId: "1:1055722180512:web:9129e86494837603"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
      storage, firebase as default  
  }