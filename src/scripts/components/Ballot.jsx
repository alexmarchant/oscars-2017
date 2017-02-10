import React from 'react';
import nominees from '../nominees.js';
import _ from 'lodash';
import '../../styles/ballot-nytimes-1.scss';
import '../../styles/ballot-nytimes-2.scss';
import '../../styles/ballot.scss';

export default class Ballot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {};

    this.reset = this.reset.bind(this);
  }

  percentComplete() {
    const filledFields = _.reduce(this.categories(), (sum, category) => {
      if (this.state[category] == null) { return sum; }
      else { return sum + 1; } 
    }, 0);
    const percentFilledFields = filledFields / this.categories().length;
    const roundedPercentFilledFields = Math.round(percentFilledFields * 100);
    return `${roundedPercentFilledFields}%`;
  }

  reset() {
    const newState = {};
    _.each(this.categories(), (category) => { newState[category] = null; });
    this.setState(newState);
  }

  render() {
    return (
      <div className="ballot">
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
                  <strong>{this.percentComplete()}</strong><span> Complete</span>
                </div>
                <div className="nytint-progress-meter nytint-gradient">
                  <span className="nytint-gradient" style={{width: this.percentComplete}}></span>
                </div>
                <div onClick={this.reset} className="clear-saved">reset</div>
              </div>
            </div>
            <div id="nytint-milestone-message" className="empty"></div>
          </div>
        </div>


        <div className="nytint-ballot-row nytint-1col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-full"  id="child-auto-id-1">
              <div className="nytint-ballot-category-title" >
                <h5 >Best Picture</h5>
              </div>
              <div className="nytint-ballot-category-pics hasFocused" >
                <div className="nytint-ballot-category-pics-frame" >
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/11ARRIVAL-master495.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Jan Thijs/Paramount Pictures</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/16FENCES-master495.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >David Lee/Paramount Pictures</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/02HACKSAW1-master495.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Mark Rogers/Lionsgate</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/12HELLHIGH2-master495.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Lorey Sebastian/CBS Films</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/23COVERMOVIES1-master495.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Hopper Stone/20th Century Fox Film Corporation</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/27COVER1-master495-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Dale Robinette/Summit Entertainment, via Associated Press</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/25LION2-master495.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Mark Rogers/The Weinstein Company</span>
                    </figcaption>
                  </figure>
                  <figure className="active media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/18MANCHESTER1-master495-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Claire Folger/Roadside Attractions, via Associated Press</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/21MOONLIGHT-master495-v4.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >David Bornfriend/A24</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Arrival</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Fences</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hacksaw Ridge</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hell or High Water</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hidden Figures</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Lion</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Manchester by the Sea</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Moonlight</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="nytint-ballot-row nytint-2col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-half"  id="child-auto-id-2">
              <div className="nytint-ballot-category-title" >
                <h5 >Director</h5>
              </div>
              <div className="nytint-ballot-category-pics hasFocused" >
                <div className="nytint-ballot-category-pics-frame" >
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/27COVERJP2-verticalTwoByThree735.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Dale Robinette/Lionsgate</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/gibson-hacksaw-verticalTwoByThree735.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Todd Williamson/Getty Images for Aacta</span>
                    </figcaption>
                  </figure>
                  <figure className="active media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/08JENKINS-MCCRANEY-web1-verticalTwoByThree735-v3.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Scott McIntyre for The New York Times</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/18MANCHESTER2-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Tawni Bannister for The New York Times</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/13DENIS-VILLENEUVE1-verticalTwoByThree735-v3.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Jan Thijs/Paramount Pictures</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Damien Chazelle</span><span className="nytint-ballot-nominee-subtitle" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Mel Gibson</span><span className="nytint-ballot-nominee-subtitle" >Hacksaw Ridge</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Barry Jenkins</span><span className="nytint-ballot-nominee-subtitle" >Moonlight</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Kenneth Lonergan</span><span className="nytint-ballot-nominee-subtitle" >Manchester by the Sea</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Denis Villeneuve</span><span className="nytint-ballot-nominee-subtitle" >Arrival</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-half"  id="child-auto-id-3">
              <div className="nytint-ballot-category-title" >
                <h5 >Actor in a Leading Role</h5>
              </div>
              <div className="nytint-ballot-category-pics hasFocused" >
                <div className="nytint-ballot-category-pics-frame" >
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/manchester-trailer-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Claire Folger/Roadside Attractions</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/27HACKSHAW-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Mark Rogers/Lionsgate</span>
                    </figcaption>
                  </figure>
                  <figure className="active media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/ryangosling-lala-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Dale Robinette/Lionsgate</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/mortensen-captain2-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Erik Simkins/Bleecker Street</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/washington-fences-verticalTwoByThree735.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >David Lee/Paramount Pictures</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Casey Affleck</span><span className="nytint-ballot-nominee-subtitle" >Manchester by the Sea</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Andrew Garfield</span><span className="nytint-ballot-nominee-subtitle" >Hacksaw Ridge</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Ryan Gosling</span><span className="nytint-ballot-nominee-subtitle" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Viggo Mortensen</span><span className="nytint-ballot-nominee-subtitle" >Captain Fantastic</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Denzel Washington</span><span className="nytint-ballot-nominee-subtitle" >Fences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nytint-ballot-row nytint-2col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-half"  id="child-auto-id-4">
              <div className="nytint-ballot-category-title" >
                <h5 >Actress in a Leading Role</h5>
              </div>
              <div className="nytint-ballot-category-pics hasFocused" >
                <div className="nytint-ballot-category-pics-frame" >
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/movies-11112016-elle-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Guy Ferrandis/Sony Pictures classNameics</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/movies-11032016-loving-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Ben Rothstein/Focus Features</span>
                    </figcaption>
                  </figure>
                  <figure className="active media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/jackie-anatomy-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Fox Searchlight Pictures</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/emmastone-lalaland-verticalTwoByThree735.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Dale Robinette/Lionsgate</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/movies-08122016-florence-verticalTwoByThree735.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Nick Wall/Paramount Pictures</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Isabelle Huppert</span><span className="nytint-ballot-nominee-subtitle" >Elle</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Ruth Negga</span><span className="nytint-ballot-nominee-subtitle" >Loving</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Natalie Portman</span><span className="nytint-ballot-nominee-subtitle" >Jackie</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Emma Stone</span><span className="nytint-ballot-nominee-subtitle" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Meryl Streep</span><span className="nytint-ballot-nominee-subtitle" >Florence Foster Jenkins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nytint-ballot-category nytint-cols-half" >
            <div className="module ad ad-dfp"  hidden="" id="MiddleRight"></div>
          </div>
        </div>


        <div className="nytint-ballot-row nytint-2col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-half"  id="child-auto-id-5">
              <div className="nytint-ballot-category-title" >
                <h5 >Actor in a Supporting Role</h5>
              </div>
              <div className="nytint-ballot-category-pics hasFocused" >
                <div className="nytint-ballot-category-pics-frame" >
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/ali-moonlight-verticalTwoByThree735.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >David Bornfriend/A24</span>
                    </figcaption>
                  </figure>
                  <figure className="active media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/12HELLHIGH1-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Lorey Sebastian/CBS Films</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/hedges-manchester-verticalTwoByThree735.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Claire Folger/Roadside Attractions and Amazon Studios</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/25LION2-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Mark Rogers/The Weinstein Company</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/shannon-nocturnal-verticalTwoByThree735-v4.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Merrick Morton/Focus Features</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Mahershala Ali</span><span className="nytint-ballot-nominee-subtitle" >Moonlight</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Jeff Bridges</span><span className="nytint-ballot-nominee-subtitle" >Hell or High Water</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Lucas Hedges</span><span className="nytint-ballot-nominee-subtitle" >Manchester by the Sea</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Dev Patel</span><span className="nytint-ballot-nominee-subtitle" >Lion</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Michael Shannon</span><span className="nytint-ballot-nominee-subtitle" >Nocturnal Animals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-half"  id="child-auto-id-6">
              <div className="nytint-ballot-category-title" >
                <h5 >Actress in a Supporting Role</h5>
              </div>
              <div className="nytint-ballot-category-pics hasFocused" >
                <div className="nytint-ballot-category-pics-frame" >
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/violadavis-fences-verticalTwoByThree735-v3.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >David Lee/Paramount Pictures</span>
                    </figcaption>
                  </figure>
                  <figure className="active media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/21MOONLIGHTJP3-verticalTwoByThree735.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >A24</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/25LION1-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Mark Rogers/The Weinstein Company</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/octaviaspencer-hidden-verticalTwoByThree735-v2.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Twentieth Century Fox</span>
                    </figcaption>
                  </figure>
                  <figure className=" media" >
                    <img  src={require('../../nytimes.com/2017 Oscar Ballot - The New York Times_files/18MANCHESTER1-williams-verticalTwoByThree735-v3.jpg')} />
                    <figcaption className="caption" >
                      <span ></span><span className="credit" >Claire Folger/Roadside Attractions, via Associated Press</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Viola Davis</span><span className="nytint-ballot-nominee-subtitle" >Fences</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Naomie Harris</span><span className="nytint-ballot-nominee-subtitle" >Moonlight</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Nicole Kidman</span><span className="nytint-ballot-nominee-subtitle" >Lion</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Octavia Spencer</span><span className="nytint-ballot-nominee-subtitle" >Hidden Figures</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Michelle Williams</span><span className="nytint-ballot-nominee-subtitle" >Manchester by the Sea</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="nytint-ballot-row nytint-3col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-7">
              <div className="nytint-ballot-category-title" >
                <h5 >Original Screenplay</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >20th Century Women</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hell or High Water</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >The Lobster</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Manchester by the Sea</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-8">
              <div className="nytint-ballot-category-title" >
                <h5 >Adapted Screenplay</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Arrival</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Fences</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hidden Figures</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Lion</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Moonlight</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-9">
              <div className="nytint-ballot-category-title" >
                <h5 >Foreign Language Film</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >A Man Called Ove</span><span className="nytint-ballot-nominee-subtitle" >Sweden</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Land of Mine</span><span className="nytint-ballot-nominee-subtitle" >Denmark</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >The Salesman</span><span className="nytint-ballot-nominee-subtitle" >Iran</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Tanna</span><span className="nytint-ballot-nominee-subtitle" >Australia</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Toni Erdmann</span><span className="nytint-ballot-nominee-subtitle" >Germany</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="nytint-ballot-row nytint-3col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-10">
              <div className="nytint-ballot-category-title" >
                <h5 >Animated Feature</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Kubo and the Two Strings</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Moana</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >My Life as a Zucchini</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >The Red Turtle</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Zootopia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-11">
              <div className="nytint-ballot-category-title" >
                <h5 >Sound Editing</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Arrival</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Deepwater Horizon</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hacksaw Ridge</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Sully</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-12">
              <div className="nytint-ballot-category-title" >
                <h5 >Visual Effects</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Deepwater Horizon</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Doctor Strange</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >The Jungle Book</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Kubo and the Two Strings</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Rogue One: A Star Wars Story</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="nytint-ballot-row nytint-3col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-13">
              <div className="nytint-ballot-category-title" >
                <h5 >Film Editing</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Arrival</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hacksaw Ridge</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hell or High Water</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Moonlight</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-14">
              <div className="nytint-ballot-category-title" >
                <h5 >Short Film, Animated</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Blind Vaysha</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Borrowed Time</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Pear Cider and Cigarettes</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Pearl</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Piper</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-15">
              <div className="nytint-ballot-category-title" >
                <h5 >Short Film, Live Action</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Ennemis Interieurs</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La Femme et le TGV</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Silent Nights</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Sing (Mindenki)</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Timecode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="nytint-ballot-row nytint-3col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-16">
              <div className="nytint-ballot-category-title" >
                <h5 >Documentary Short Subject</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >4.1 Miles</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Extremis</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Joe's Violin</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Watani: My Homeland</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >The White Helmets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-17">
              <div className="nytint-ballot-category-title" >
                <h5 >Original Score</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Jackie</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Lion</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Moonlight</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Passengers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-18">
              <div className="nytint-ballot-category-title" >
                <h5 >Original Song</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Audition (The Fools Who Dream)</span><span className="nytint-ballot-nominee-subtitle" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Can't Stop the Feeling</span><span className="nytint-ballot-nominee-subtitle" >Trolls</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >City of Stars</span><span className="nytint-ballot-nominee-subtitle" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >The Empty Chair</span><span className="nytint-ballot-nominee-subtitle" >Jim: The James Foley Story</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >How Far I'll Go</span><span className="nytint-ballot-nominee-subtitle" >Moana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="nytint-ballot-row nytint-3col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-19">
              <div className="nytint-ballot-category-title" >
                <h5 >Production Design</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Arrival</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Fantastic Beasts and Where to Find Them</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hail, Caesar!</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Passengers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-20">
              <div className="nytint-ballot-category-title" >
                <h5 >Cinematography</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Arrival</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Lion</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Moonlight</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Silence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-21">
              <div className="nytint-ballot-category-title" >
                <h5 >Costume Design</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Allied</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Fantastic Beasts and Where to Find Them</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Florence Foster Jenkins</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Jackie</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="nytint-ballot-row nytint-3col clearfix" >
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-22">
              <div className="nytint-ballot-category-title" >
                <h5 >Makeup</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >A Man Called Ove</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Star Trek Beyond</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Suicide Squad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-23">
              <div className="nytint-ballot-category-title" >
                <h5 >Documentary Feature</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >13th</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Fire at Sea</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >I Am Not Your Negro</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Life, Animated</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >O. J.: Made in America</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multiple-choice-question unanswered has-selected" >
            <div className="nytint-ballot-category nytint-cols-third"  id="child-auto-id-24">
              <div className="nytint-ballot-category-title" >
                <h5 >Sound Mixing</h5>
              </div><span ></span>
              <div className="nytint-ballot-nominees" >
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >La La Land</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Hacksaw Ridge</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered selected" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Rogue One: A Star Wars Story</span>
                  </div>
                </div>
                <div className="answer nytint-ballot-nominee question-unanswered" >
                  <div className="nytint-ballot-nominee-inner" >
                    <span className="nytint-vote-target" >&nbsp;</span><span className="nytint-ballot-nominee-title" >Arrival</span>
                  </div>
                </div>
                <Answer title="13 hours" />
              </div>
            </div>
          </div>
        </div>



        <div className="nytint-ballot-row nytint-3col clearfix" ></div>
      </div>
    );
  }
}

class Answer extends React.Component {
  render() {
    return (
      <div className={'answer nytint-ballot-nominee question-unanswered' + (this.props.selected ? ' selected' : '')} >
        <div className="nytint-ballot-nominee-inner" >
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
