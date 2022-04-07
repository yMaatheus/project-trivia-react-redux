import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementScore } from '../actions';

class GameAnswers extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      timer: null,
      isAnswered: false,
      isButtonsDisabled: false,
      answers: [],
    };
  }

  componentDidMount() {
    const { handleNextButton } = this.props;
    const oneSecond = 1000;
    this.setState({
      timer: setInterval(this.decrementAndTimeoutCheck, oneSecond),
      answers: this.handleAnswers(),
    });
    handleNextButton(true);
  }

  decrement = () => {
    const { seconds, isAnswered } = this.state;
    if (seconds > 0 && !isAnswered) {
      this.setState({
        seconds: (seconds - 1),
      });
    }
  }

  questionTimeout = () => {
    const { handleNextButton } = this.props;
    this.setState({ isButtonsDisabled: true });
    this.stopTimer();
    this.setBorderAnswers();
    handleNextButton(false);
  }

  stopTimer = () => {
    const { timer } = this.state;
    clearInterval(timer);
  }

  decrementAndTimeoutCheck = () => {
    const { seconds, isAnswered } = this.state;
    this.decrement();
    if (seconds <= 0 && !isAnswered) {
      this.questionTimeout();
    }
  }

  // ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle = (array) => (
    array.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  );

  setBorderAnswers = () => {
    const correct = document.querySelector('.correct');
    const incorrect = document.getElementsByClassName('incorrect');
    correct.style.border = '3px solid rgb(6, 240, 15)';
    for (let i = 0; i < incorrect.length; i += 1) {
      incorrect[i].style.border = '3px solid rgb(255, 0, 0) ';
    }
  }

  handleClick = ({ target }) => {
    this.setBorderAnswers();
    const { computeNewScore, handleNextButton } = this.props;
    this.setState({ isAnswered: true });
    this.stopTimer();
    handleNextButton(false);
    if (!target.classList.contains('correct')) {
      return;
    }
    const points = this.calculatePointsAnswered();
    computeNewScore(points);
  }

  calculatePointsAnswered = () => {
    const { seconds } = this.state;
    const difficulty = 3;
    const ten = 10;
    return ten + (seconds * difficulty);
  }

  handleAnswers = () => {
    const { question: { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } } = this.props;
    const array = incorrectAnswers.map(
      (incorrectAnswer, index) => ({ correct: false, answer: incorrectAnswer, index }),
    );
    array.push({ correct: true, answer: correctAnswer, index: correctAnswer });
    return this.shuffle(array);
  }

  render() {
    const { seconds, isButtonsDisabled, answers } = this.state;
    return (
      <div>
        <div data-testid="answer-options">
          {answers.map(({ correct, answer, index }) => (
            <button
              type="button"
              key={ index }
              data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
              className={ correct ? 'correct' : 'incorrect' }
              onClick={ this.handleClick }
              disabled={ isButtonsDisabled }
            >
              {answer}
            </button>
          ))}
        </div>
        <span>{ seconds }</span>
      </div>
    );
  }
}

GameAnswers.propTypes = {
  question: PropTypes.object,
  computeNewScore: PropTypes.func,
  handleNextButton: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  computeNewScore: (points) => dispatch(incrementScore(points)),
});

export default connect(null, mapDispatchToProps)(GameAnswers);
