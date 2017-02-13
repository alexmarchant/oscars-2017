import React from 'react';
import categories from '../categories.js';
import images from '../images.js';
import _ from 'lodash';
import cx from 'classnames';
import '../../styles/ballot-nytimes-1.scss';
import '../../styles/ballot-nytimes-2.scss';
import '../../styles/ballot.scss';

const rows = [
  {columns: 1, categories: 1, showImages: true, crop: 'master495'},
  {columns: 2, categories: 2, showImages: true, crop: 'verticalTwoByThree735'},
  {columns: 2, categories: 1, showImages: true, crop: 'verticalTwoByThree735'},
  {columns: 2, categories: 2, showImages: true, crop: 'verticalTwoByThree735'},
  {columns: 3, categories: 3},
  {columns: 3, categories: 3},
  {columns: 3, categories: 3},
  {columns: 3, categories: 3},
  {columns: 3, categories: 3},
  {columns: 3, categories: 3},
];

export default class Ballot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selectedNominees: {},
      paid: false,
    };
    this.firebaseRef = `users/${this.props.currentUser.uid}/ballot`;
    this.reset = this.reset.bind(this);
    this.selectNomineeForCategory = this.selectNomineeForCategory.bind(this);
    this.togglePaid = this.togglePaid.bind(this);
  }

  componentDidMount() {
    console.log('Loading...');
    window.firebase.database().ref(this.firebaseRef).on('value', (snapshot) => {
      console.log('Snapshot received...');

      var selectedNominees = snapshot.val() || {};
      selectedNominees = _.omitBy(snapshot.val(), (value, key) => ( key === 'paid' ));
      const paid = snapshot.val() ? snapshot.val().paid : false;

      this.setState({
        loaded: true,
        selectedNominees: selectedNominees,
        paid: paid,
      });
    });
  }

  percentComplete() {
    const fieldCount = categories.length + 1;
    const filledFieldCount = Object.keys(this.state.selectedNominees).length +
      (this.state.paid ? 1 : 0);
    const percent = filledFieldCount / fieldCount;
    const roundedPercent = Math.round(percent * 100);
    return `${roundedPercent}%`;
  }

  reset() {
    if (!this.state.loaded) { return; }

    this.setState({selectedNominees: {}});
    this.resetDB();
  }

  resetDB() {
    if (!this.state.loaded) { return; }

    console.log('Updating...');
    window.firebase.database().ref(this.firebaseRef).set({}).then((res) => {
      console.log('Updated...');
    }, (err) => {
      console.error(`Error... ${err}`);
    });
  }

  selectNomineeForCategory(nominee, category) {
    if (!this.state.loaded) { return; }

    const newSelectedNominees = _.clone(this.state.selectedNominees);
    newSelectedNominees[category] = nominee.name;
    this.setState({selectedNominees: newSelectedNominees});
    this.selectNomineeForCategoryDB(nominee, category);
  }

  selectNomineeForCategoryDB(nominee, category) {
    if (!this.state.loaded) { return; }

    const updates = {};
    const ref = `${this.firebaseRef}/${category}`;
    updates[ref] = nominee.name;

    console.log('Updating...');
    window.firebase.database().ref().update(updates).then((res) => {
      console.log('Updated...');
    }, (err) => {
      console.error(`Error... ${err}`);
    });
  }

  togglePaid() {
    if (!this.state.loaded) { return; }

    const newPaidVal = !this.state.paid;
    this.setState({paid: newPaidVal});
    this.togglePaidDB(newPaidVal);
  }

  togglePaidDB(val) {
    if (!this.state.loaded) { return; }

    const updates = {};
    const ref = `${this.firebaseRef}/paid`;
    updates[ref] = val;

    console.log('Updating...');
    window.firebase.database().ref().update(updates).then((res) => {
      console.log('Updated...');
    }, (err) => {
      console.error(`Error... ${err}`);
    });
  }

  render() {
    var currentCategoryIndex = 0;

    return (
      <div className="ballot nytint-can-vote">
        <Header reset={this.reset} percentComplete={this.percentComplete()} />

        <div className="nytint-ballot-row nytint-1col clearfix">
          <h4>Instructions</h4>
          <ol>
            <li>Fill out this form</li>
            <li><a href="https://venmo.com" target="_blank">Send $5 to @amarchant on venmo</a></li>
          </ol>

          <h4>Rules</h4>
          <ul>
            <li>All forms need to be completed and payments in before the oscars start (Feb 26 8:30PM EST). I'll lock the form at that point too.</li>
            <li>Each category has a certain number of points assigned. If you get the category right you get the points. Person with the most points wins. Winner take all.</li>
            <li>In case of a tie, the pot will be split evenly.</li>
          </ul>
        </div>

        {_.map(rows, (row, index) => {
          const rowCategories = categories.slice(currentCategoryIndex, currentCategoryIndex + row.categories);
          currentCategoryIndex += row.categories;
          return (
            <Row
              categories={rowCategories}
              columns={row.columns}
              showImages={row.showImages}
              crop={row.crop}
              selectNomineeForCategory={this.selectNomineeForCategory}
              selectedNominees={this.state.selectedNominees}
              key={index}
            />
          );
        })}

        <div className="nytint-ballot-row nytint-3col clearfix"></div>

        <div className="nytint-ballot-row nytint-1col clearfix">
          <Answer
            title="I paid $5 to @amarchant on venmo"
            onClick={this.togglePaid}
            selected={this.state.paid}
          />
        </div>

        <div className="nytint-ballot-row nytint-1col clearfix">
          <h2 className="ballot__footer-message">
            Your answers are continuously saved as you filled out the form, you're all set!
          </h2>
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="ballot__header-container">
        <div id="nytint-oscars-header" className="affix clearfix" data-affix="width: auto; height: fixed;">
          <div id="nytint-oscar-headings" className="clearfix">
            <h1>Oscar Ballot</h1>
          </div>
          <div id="nytint-ballot-info" className="clearfix">
            <div id="nytint-ballot-results"></div>
            <div id="nytint-ballot-progress">
              <div id="nytint-progress-title">Your Ballot</div>
              <div className="nytint-progress-percentage">
                <strong>{this.props.percentComplete}</strong><span> Complete</span>
              </div>
              <div className="nytint-progress-meter nytint-gradient">
                <span className="nytint-gradient" style={{width: this.props.percentComplete}}></span>
              </div>
              <div onClick={this.props.reset} className="clear-saved">reset</div>
            </div>
          </div>
          <div id="nytint-milestone-message" className="empty"></div>
        </div>
      </div>
    );
  }
}

class Row extends React.Component {
  render() {
    const emptyCols = this.props.columns - this.props.categories.length;

    var cols;
    switch (this.props.columns) {
      case 1:
        cols = 'full';
        break;
      case 2:
        cols = 'half';
        break;
      case 3:
        cols = 'third';
        break;
      default:
        console.error('Error :(');
        cols =  '';
    }


    return (
      <div className={`nytint-ballot-row nytint-${this.props.columns}col clearfix`}>
        {_.map(this.props.categories, (category, index) => {

          const selectedNomineeName = this.props.selectedNominees[category.title];
          const selectedNominee = _.find(category.nominees, {name: selectedNomineeName});

          return (
            <Category
              {...category}
              showImages={this.props.showImages}
              crop={this.props.crop}
              cols={cols}
              selectNomineeForCategory={this.props.selectNomineeForCategory}
              selectedNominee={selectedNominee}
              key={index}
            />
          );
        })}
        {_.map(_.range(emptyCols), (n) => (
          <div className={`nytint-ballot-category nytint-cols-${cols}`} key={n}></div>
        ))}
      </div>
    );
  }
}

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverNominee: null,
    }
  }

  activeImage() {
    if (this.state.hoverNominee) {
      return this.state.hoverNominee.image;
    } else if (this.props.selectedNominee) {
      return this.props.selectedNominee.image;
    } else {
      return this.props.nominees[0].image
    }
  }

  render() {
    return (
      <div className="multiple-choice-question unanswered has-selected" >
        <div className={`nytint-ballot-category nytint-cols-${this.props.cols}`}>
          <div className="nytint-ballot-category-title">
            <h5>{this.props.title}</h5>
            <p>{this.props.points} Point{this.props.points > 1 ? 's' : ''}</p>
          </div>
          {
            this.props.showImages ?
            <div className="nytint-ballot-category-pics hasFocused" >
              <div className="nytint-ballot-category-pics-frame" >
                {_.map(this.props.nominees, (nominee, index) => (
                  <Image
                    imageData={images[parseInt(nominee.image)]}
                    crop={this.props.crop}
                    active={this.activeImage() === nominee.image}
                    key={index}
                  />
                ))}
              </div>
            </div> : null
          }
          <div className="nytint-ballot-nominees">
            {_.map(this.props.nominees, (nominee, index) => (
              <Answer
                title={nominee.name}
                subtitle={nominee.name !== nominee.film ? nominee.film : false}
                onMouseEnter={() => {this.setState({hoverNominee: nominee})}}
                onMouseLeave={() => {this.setState({hoverNominee: null})}}
                onClick={() => {this.props.selectNomineeForCategory(nominee, this.props.title)}}
                selected={this.props.selectedNominee && this.props.selectedNominee.name === nominee.name}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class Answer extends React.Component {
  render() {
    return (
      <div
        className={'answer nytint-ballot-nominee question-unanswered' + (this.props.selected ? ' selected' : '')}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onClick={this.props.onClick}
      >
        <div className="nytint-ballot-nominee-inner">
          <span className="nytint-vote-target" >&nbsp;</span>
          <span className="nytint-ballot-nominee-title" >{this.props.title}</span>
          {
            this.props.subtitle ? 
              <span className="nytint-ballot-nominee-subtitle" >{this.props.subtitle}</span> :
              null
          }
        </div>
      </div>
    );
  }
}

class Image extends React.Component {
  render() {
    const crop = _.find(this.props.imageData.crops, {'type': this.props.crop});
    const src = `${this.props.imageData.host}${crop.content}`;
    return (
      <figure className={cx('media', this.props.active ? 'active' : null)}>
        <img src={src} />
        <figcaption className="caption">
          <span className="credit">{this.props.imageData.credit}</span>
        </figcaption>
      </figure>
    );
  }
}
