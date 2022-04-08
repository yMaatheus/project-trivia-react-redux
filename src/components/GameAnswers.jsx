import React from 'react';
import PropTypes from 'prop-types';

class GameAnswers extends React.Component {
  render() {
    const { answers, isButtonsDisabled, handleClick } = this.props;
    return (
      <div data-testid="answer-options">
        {answers.map(({ correct, answer, index }) => (
          <button
            type="button"
            key={ index }
            data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
            className={ correct ? 'correct' : 'incorrect' }
            onClick={ handleClick }
            disabled={ isButtonsDisabled }
          >
            {answer}
          </button>
        ))}
      </div>
    );
  }
}

GameAnswers.propTypes = {
  answers: PropTypes.array,
  isButtonsDisabled: PropTypes.bool,
  handleClick: PropTypes.func,
}.isRequired;

export default GameAnswers;
