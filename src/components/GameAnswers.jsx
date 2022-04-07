import React from 'react';
import PropTypes from 'prop-types';

class GameAnswers extends React.Component {
    shuffle = (array) => (
      array.map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );

    handleAnswers = () => {
      const { question: { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } } = this.props;
      const correct = (
        <button type="button" key={ correctAnswer } data-testid="correct-answer">
          {correctAnswer}
        </button>);
      const array = incorrectAnswers.map(((incorrectAnswer, index) => (
        <button type="button" key={ index } data-testid={ `wrong-answer-${index}` }>
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
