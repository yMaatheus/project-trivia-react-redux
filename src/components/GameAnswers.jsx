import React from 'react';
import PropTypes from 'prop-types';

class GameAnswers extends React.Component {
    shuffle = (array) => (
      array.map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );

    handleClick = () => {
      const correct = document.querySelector('.correct');
      const incorrect = document.getElementsByClassName('incorrect');
      correct.style.border = '3px solid rgb(6, 240, 15)';
      for (let i = 0; i < incorrect.length; i += 1) {
        incorrect[i].style.border = '3px solid rgb(255, 0, 0) ';
      }
    }

    handleAnswers = () => {
      const { question: { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } } = this.props;
      const correct = (
        <button
          type="button"
          key={ correctAnswer }
          data-testid="correct-answer"
          className="correct"
          onClick={ this.handleClick }
        >
          {correctAnswer}
        </button>);
      const array = incorrectAnswers.map(((incorrectAnswer, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${index}` }
          className="incorrect"
          onClick={ this.handleClick }
        >
          {incorrectAnswer}
        </button>)));
      array.push(correct);
      return this.shuffle(array);
    }

    render() {
      const Answers = this.handleAnswers();
      return (
        <div data-testid="answer-options">
          { Answers }
        </div>
      );
    }
}

GameAnswers.propTypes = {
  question: PropTypes.object,
}.isRequired;

export default GameAnswers;
