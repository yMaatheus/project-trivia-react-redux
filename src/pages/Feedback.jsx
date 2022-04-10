import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

  feedbackMessage = () => {
    const THREE = 3;
    const { correctScoreNumber } = this.props;
    return correctScoreNumber < THREE ? 'Could be better...' : 'Well Done!';
  }

  render() {
    const { finalScore, correctScoreNumber } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{this.feedbackMessage()}</h1>
        <h5 data-testid="feedback-total-score">{finalScore}</h5>
        <span data-testid="feedback-total-question">{correctScoreNumber}</span>
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

const mapStateToProps = (state) => ({
  correctScoreNumber: state.player.assertions,
  finalScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
