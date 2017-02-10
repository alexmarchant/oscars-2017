import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCuPukOFZCnKE3TzIomRRzoiNCwB3Sj_Ls",
  authDomain: "oscars-2016-96f1a.firebaseapp.com",
  databaseURL: "https://oscars-2016-96f1a.firebaseio.com",
  storageBucket: "oscars-2016-96f1a.appspot.com",
  messagingSenderId: "520275680664"
};

firebase.initializeApp(config);

window.firebase = firebase;
