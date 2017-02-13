import React from 'react';
import '../../../node_modules/firebaseui/dist/firebaseui.css';
import '../../styles/auth.scss';

export default class Auth extends React.Component {
  componentDidMount() {
    // Initialize FirebaseUI
    const uiConfig = {
      callbacks: {
        signInSuccess: function(currentUser, credential, redirectUrl) {
          return true;
        },
      },
      signInOptions: [
        window.firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'redirect',
      tosUrl: '/#tos'
    };
    // The start method will wait until the DOM is loaded.
    myFirebaseUI.start('.auth__firebase-ui', uiConfig);
  }

  render() {
    return (
      <div className="auth">
        <h1>Please sign in before you fill out the ballot...</h1>
        <div className="auth__firebase-ui"></div>
      </div>
    );
  }
}
