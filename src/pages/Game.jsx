import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementScore } from '../actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      timer: null,
      isAnswered: false,
      isButtonsDisabled: false,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    this.setState({
      timer: setInterval(this.decrementAndTimeoutCheck, oneSecond),
    });
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

  handleQuestion = () => {
    const { computeNewScore } = this.props;
    this.setState({ isAnswered: true });
    this.stopTimer();
    const correct = true;
    if (!correct) {
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

  render() {
    const { seconds, timer, isAnswered, isButtonsDisabled } = this.state;
    return (
      <div>
        <h1>Game</h1>
        <span>{ seconds }</span>
      </div>
    );
  }
}

Game.propTypes = {
  computeNewScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  computeNewScore: (points) => dispatch(incrementScore(points)),
});

export default connect(null, mapDispatchToProps)(Game);
