import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  clickPlayAgainButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  clickRankingButton = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <button
          data-testid="btn-play-again"
          label="Play Again"
          type="button"
          name="button play again"
          onClick={ this.clickPlayAgainButton }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.clickRankingButton }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Feedback;
