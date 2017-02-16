import React from 'react';
import Ballot from './Ballot.jsx';
import Admin from './Admin.jsx';
import Leaderboard from './Leaderboard.jsx';
import '../../styles/main.scss';

export default class Main extends React.Component {
  logOut() {
    window.firebase.auth().signOut().then(() => {},
    function(error) {
      console.error(error);
      alert('Error :(');
    });
  }

  componentDidMount() {
    this.updateProfile();
  }

  updateProfile() {
    const updates = {};
    const userRef = `users/${this.props.currentUser.uid}`;

    updates[`${userRef}/email`] = this.props.currentUser.email;
    updates[`${userRef}/displayName`] = this.props.currentUser.displayName;
    updates[`${userRef}/photoURL`] = this.props.currentUser.photoURL;

    console.log('Updating...');
    window.firebase.database().ref().update(updates).then((res) => {
      console.log('Updated...');
    }, (err) => {
      console.error(`Error... ${err}`);
    });
  }

  renderMainContent() {
    switch (window.location.hash) {
      case '#/admin':
        return <Admin />;
      case '#/leaderboard':
        return <Leaderboard currentUser={this.props.currentUser} />;
      default:
        return <Ballot currentUser={this.props.currentUser} />;
    }
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
        {this.renderMainContent()}
      </div>
    );
  }
}
