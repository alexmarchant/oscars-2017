import React from 'react';
import categories from '../categories.js';
import _ from 'lodash';
import '../../styles/admin.scss';

export default class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      winners: {},
    };
    this.firebaseRef = 'winners';
    this.selectNomineeForCategory = this.selectNomineeForCategory.bind(this);
  }

  componentDidMount() {
    console.log('Loading...');
    window.firebase.database().ref(this.firebaseRef).on('value', (snapshot) => {
      console.log('Snapshot received...');

      var winners = snapshot.val() || {};

      this.setState({
        loaded: true,
        winners: winners,
      });
    });
  }

  selectNomineeForCategory(nomineeName, category) {
    if (!this.state.loaded) { return; }

    const newWinners = _.clone(this.state.winners);
    newWinners[category] = nomineeName;
    this.setState({winners: newWinners});
    this.selectNomineeForCategoryDB(nomineeName, category);
  }

  selectNomineeForCategoryDB(nomineeName, category) {
    if (!this.state.loaded) { return; }

    const updates = {};
    const ref = `${this.firebaseRef}/${category}`;
    updates[ref] = nomineeName;

    console.log('Updating...');
    window.firebase.database().ref().update(updates).then((res) => {
      console.log('Updated...');
    }, (err) => {
      console.error(`Error... ${err}`);
    });
  }

  render() {
    return (
      <div className="admin">
        <h1>Winners</h1>
        {_.map(categories, (category, index) => (
          <Category
            {...category}
            key={index}
            selectedNomineeName={this.state.winners[category.title]}
            selectNomineeForCategory={this.selectNomineeForCategory}
          />
        ))}
      </div>
    );
  }
}

class Category extends React.Component {
  render() {
    return (
      <div className="admin__category">
        <h4>{this.props.title}</h4>
        {_.map(this.props.nominees, (nominee, index) => (
          <Nominee
            categoryTitle={this.props.title}
            {...nominee}
            key={index}
            selected={this.props.selectedNomineeName === nominee.name}
            selectNomineeForCategory={this.props.selectNomineeForCategory}
          />
        ))}
      </div>
    );
  }
}

class Nominee extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  handleCheckboxClick(event) {
    const checked = event.target.checked;
    const name = checked ? this.props.name : null;
    this.props.selectNomineeForCategory(name, this.props.categoryTitle);
  }

  render() {
    return (
      <div className="admin__nominee">
        <label>
          <input
            type="checkbox"
            checked={this.props.selected}
            onChange={this.handleCheckboxClick}
          />
          {this.props.name}
        </label>
      </div>
    );
  }
}
