import React from 'react';

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
    console.log(seconds);
    this.decrement();
    if (seconds <= 0 && !isAnswered) {
      this.questionTimeout();
    }
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

export default Game;
