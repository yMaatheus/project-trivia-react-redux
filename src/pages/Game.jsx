import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementScore } from '../actions';
import Header from '../components/Header';
import Question from '../components/Question';
import GameAnswers from '../components/GameAnswers';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      timer: null,
      isAnswered: false,
      isButtonsDisabled: false,
      questionIndex: 0,
      isHiddenNextButton: true,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    this.setState({
      timer: setInterval(this.decrementAndTimeoutCheck, oneSecond),
    });
    this.handleNextButton(true);
  }

  handleNextButton = (value) => {
    this.setState({ isHiddenNextButton: value });
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
    this.setState({ isButtonsDisabled: true });
    this.stopTimer();
    this.setBorderAnswers();
    this.handleNextButton(false);
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

  setBorderAnswers = () => {
    const correct = document.querySelector('.correct');
    const incorrect = document.querySelectorAll('.incorrect');
    correct.style.border = '3px solid rgb(6, 240, 15)';
    for (let i = 0; i < incorrect.length; i += 1) {
      incorrect[i].style.border = '3px solid rgb(255, 0, 0)';
    }
  }

  handleClick = ({ target }) => {
    this.setBorderAnswers();
    const { computeNewScore } = this.props;
    this.setState({ isAnswered: true });
    this.stopTimer();
    this.handleNextButton(false);
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

  onClickNextButton = () => {
    const { history } = this.props;
    const { questionIndex } = this.state;
    const lastQuestion = 4;
    if (questionIndex >= lastQuestion) {
      history.push('/feedback');
      return;
    }
    this.setState({ questionIndex: questionIndex + 1 });
    this.reset();
  }

  resetBorderAnswers = () => {
    const correct = document.querySelector('.correct');
    const incorrect = document.querySelectorAll('.incorrect');
    correct.style.border = '';
    for (let i = 0; i < incorrect.length; i += 1) {
      incorrect[i].style.border = '';
    }
  }

  reset = () => {
    const oneSecond = 1000;
    this.setState({
      seconds: 30,
      timer: setInterval(this.decrementAndTimeoutCheck, oneSecond),
      isAnswered: false,
      isButtonsDisabled: false,
      isHiddenNextButton: true,
    });
    this.resetBorderAnswers();
  }

  render() {
    const { seconds, isButtonsDisabled, questionIndex, isHiddenNextButton } = this.state;
    const { questions, answers } = this.props;
    const question = questions[questionIndex];
    return (
      <div>
        <h1>Game</h1>
        <Header />
        <Question question={ question } />
        <GameAnswers
          answers={ answers[questionIndex] }
          handleClick={ this.handleClick }
          isButtonsDisabled={ isButtonsDisabled }
        />
        <span>{ seconds }</span>
        <button
          type="button"
          hidden={ isHiddenNextButton && 'hidden' }
          data-testid="btn-next"
          onClick={ this.onClickNextButton }
        >
          Next
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.array,
  computeNewScore: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.player.questions,
  answers: state.player.questionsAnswers,
});

const mapDispatchToProps = (dispatch) => ({
  computeNewScore: (points) => dispatch(incrementScore(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
