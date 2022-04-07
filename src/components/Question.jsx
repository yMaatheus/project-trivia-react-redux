import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <h1>Trivia Game</h1>
        <h3 data-testid="question-category">{ question.category }</h3>
        <h4 data-testid="question-text">{ question.question }</h4>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object,
}.isRequired;

export default connect()(Question);
