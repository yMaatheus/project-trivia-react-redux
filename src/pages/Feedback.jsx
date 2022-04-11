import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { setRank } from '../services';
import { resetScore } from '../actions';

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score, gravatar } = this.props;
    setRank({ name, score, gravatar });
  }

  clickPlayAgainButton = () => {
    const { history, resScore } = this.props;
    history.push('/');
    resScore();
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
  name: state.player.name,
  score: state.player.score,
  gravatar: state.player.gravatar,
  correctScoreNumber: state.player.assertions,
  finalScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resScore: () => dispatch(resetScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
