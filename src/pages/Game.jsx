import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import GameAnswers from '../components/GameAnswers';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
  }

  render() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    const question = questions[questionIndex];
    return (
      <div>
        <h1>Game</h1>
        <Header />
        <Question question={ question } />
        <GameAnswers question={ question } />
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.player.questions,
});

export default connect(mapStateToProps)(Game);
