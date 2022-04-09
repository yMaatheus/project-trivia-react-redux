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
    let message = '';
    // correctScoreNumber < 3 && message = 'Could be better...'
    if (correctScoreNumber < THREE) {
      message = 'Could be better...';
      return message;
    }
    if (correctScoreNumber >= THREE) {
      message = 'Well Done!';
      return message;
    }
  }

  render() {
    const { finalScore } = this.props;
    return (
      <div>
        <Header />
        {/* <h1 data-testid="feedback-text">Feedback</h1> */}
        <h3 data-testid="feedback-totalscore">{`Seu score final é ${finalScore}!`}</h3>
        <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
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
  correctScoreNumber: state.player.questionScore,
  finalScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
