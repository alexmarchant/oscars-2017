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
  {columns: 3, categories: 0},
];

export default class Ballot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {};

    this.reset = this.reset.bind(this);
  }

  percentComplete() {
    //    const filledFields = _.reduce(this.categories(), (sum, category) => {
    //      if (this.state[category] == null) { return sum; }
    //      else { return sum + 1; } 
    //    }, 0);
    //    const percentFilledFields = filledFields / this.categories().length;
    //    const roundedPercentFilledFields = Math.round(percentFilledFields * 100);
    //    return `${roundedPercentFilledFields}%`;
    return '0%';
  }

  reset() {
    // const newState = {};
    // _.each(this.categories(), (category) => { newState[category] = null; });
    // this.setState(newState);
  }

  render() {
    var currentCategoryIndex = 0;

    return (
      <div className="ballot">
        <Header reset={this.reset} percentComplete={this.percentComplete()} />

        {_.map(rows, (row, index) => {
          const rowCategories = categories.slice(currentCategoryIndex, currentCategoryIndex + row.categories);
          currentCategoryIndex += row.categories;
          return (
            <Row
              categories={rowCategories}
              columns={row.columns}
              showImages={row.showImages}
              crop={row.crop}
              key={index}
            />
          );
        })}
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
          return (
            <Category
              {...category}
              showImages={this.props.showImages}
              crop={this.props.crop}
              cols={cols}
              key={index}
            />
          );
        })}
        {_.map(_.range(emptyCols), (n) => (
          <div className="multiple-choice-question unanswered has-selected" key={n}>
            <div className={`nytint-ballot-category nytint-cols-${cols}`}>
            </div>
          </div>
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
      selectedNominee: null,
    }
  }

  activeImage() {
    if (this.state.hoverNominee) {
      return this.state.hoverNominee.image;
    } else if (this.state.selectedNominee) {
      return this.state.selectedNominee.image;
    } else {
      return this.props.nominees[0].image
    }
  }

  render() {
    return (
      <div className="multiple-choice-question unanswered has-selected" >
        <div className={`nytint-ballot-category nytint-cols-${this.props.cols}`}>
          <div className="nytint-ballot-category-title">
            <h5 >{this.props.title}</h5>
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
                onMouseEnter={() => {this.setState({hoverNominee: nominee})}}
                onMouseLeave={() => {this.setState({hoverNominee: null})}}
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
    const filteredCrops = _.filter(this.props.imageData.crops, (crop) => {
      return crop.type === this.props.crop;
    });
    const content = filteredCrops[0].content;
    const src = `${this.props.imageData.host}${content}`;
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
