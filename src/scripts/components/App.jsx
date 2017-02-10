import React from 'react';
import Auth from './Auth.jsx';
import Main from './Main.jsx';

const LoggedInState = {
  LOADING: 'LOADING',
  FALSE: 'FALSE',
  TRUE: 'TRUE',
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedInState: LoggedInState.LOADING,
      currentUser: null,
    };
  }

  componentDidMount() {
    window.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedInState: LoggedInState.TRUE,
          currentUser: user,
        })
      } else {
        this.setState({loggedInState: LoggedInState.FALSE})
      }
    });
  }

  renderMainContent() {
    switch (this.state.loggedInState) {
      case LoggedInState.LOADING:
        return <div>Loading...</div>;
      case LoggedInState.FALSE:
        return <Auth />;
      case LoggedInState.TRUE:
        return <Main currentUser={this.state.currentUser} />;
      default:
        return <div>Error :(</div>;
    }
  }

  render() {
    return <div>{this.renderMainContent()}</div>;
  }
}
