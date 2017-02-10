import firebaseui from 'firebaseui';

// Initialize the FirebaseUI Widget using Firebase.
window.myFirebaseUI = new firebaseui.auth.AuthUI(window.firebase.auth());

