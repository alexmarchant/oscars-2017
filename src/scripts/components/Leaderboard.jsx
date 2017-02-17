import React from 'react';
import cx from 'classnames';
import categories from '../categories.js';
import '../../styles/leaderboard.scss';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      winners: {},
      users: [],
    };
    this.score = 1;
  }

  componentDidMount() {
    // Load users
    window.firebase.database().ref('users').on('value', (snapshot) => {
      const users = this.formatUsers(snapshot.val());
      this.setState({
        users: users
      });
    });

    // Load winners
    window.firebase.database().ref('winners').on('value', (snapshot) => {
      var winners = snapshot.val() || {};
      this.setState({
        winners: winners
      });
    });
  }

  formatUsers(users) {
    if (!users) { return []; }
    return _.map(users, (data, uid) => (
      _.merge({uid: uid}, data)
    ));
  }

  sortedUserScores() {
    return _.reverse(_.sortBy(this.userScores(), 'score'));
  }

  userScores() {
    return _.map(this.state.users, (user) => (
      _.merge(user, {score: this.scoreForUser(user)})
    ));
  }

  scoreForUser(user) {
    var score = 0;

    _.forEach(user.ballot, (nominee, category) => {
      if (this.state.winners[category] === nominee) {
        const categoryData = _.find(categories, {title: category});
        const points = categoryData.points;
        score += points;
      }
    });

    return score;
  }

  currentUserBallot() {
    const userData = _.find(this.state.users, {uid: this.props.currentUser.uid});
    return userData ? userData.ballot : {};
  }

  render() {
    return (
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <table className="leaderboard__table">
          <thead>
            <tr className="leaderboard__row">
              <th className="leaderboard__rank"></th>
              <th className="leaderboard__display-name">Name</th>
              <th className="leaderboard__score">Score</th>
            </tr>
          </thead>
          <tbody>
            {_.map(this.sortedUserScores(), (data, index) => (
              <tr
                className={cx('leaderboard__row', data.uid === this.props.currentUser.uid ? 'active' : null)}
                key={index}
              >
                <td className="leaderboard__rank">{index + 1}</td>
                <td className="leaderboard__display-name">{data.displayName || 'Anon.'}</td>
                <td className="leaderboard__score">{data.score}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="picks">
          <h1>Your Picks</h1>
          {_.map(categories, (category, index) => {
            const yourPick = this.currentUserBallot() ? this.currentUserBallot()[category.title] : null;
            const winner = this.state.winners[category.title];
            const statusClass = winner ? (winner === yourPick ? 'won' : 'lost') : null;

            return (
              <div className={cx('picks__category', statusClass)} key={index}>
                <h2>{category.title}</h2>
                <div>
                  <span className="picks__label">Your pick:&nbsp;</span>
                  <span className="picks__value">{yourPick || '--'}</span>
                </div>
                <div>
                  <span className="picks__label">Winner:&nbsp;</span>
                  <span className="picks__value">{winner || '--'}</span>
                </div>
                <div>
                  <span className="picks__label">Points:&nbsp;</span>
                  <span className="picks__value">{category.points}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
