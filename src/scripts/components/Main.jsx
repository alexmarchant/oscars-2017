import React from 'react';
import Ballot from './Ballot.jsx';
import '../../styles/main.scss';

export default class Main extends React.Component {
  logOut() {
    window.firebase.auth().signOut().then(() => {},
    function(error) {
      console.error(error);
      alert('Error :(');
    });
  }

  render() {
    return (
      <div className="main">
        <div className="main__header">
          <div className="main__header-content">
            <img className="main__header-profile" src={this.props.currentUser.photoURL} />
            <div className="main__header-name">{this.props.currentUser.displayName}</div>
            <button onClick={this.logOut}>Log Out</button>
          </div>
        </div>
        <Ballot currentUser={this.props.currentUser} />
      </div>
    );
  }
}
