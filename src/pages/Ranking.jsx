import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRank } from '../services';
import { resetScore } from '../actions';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: this.sortRank(),
    };
  }

  sortRank = () => {
    const rank = getRank();
    rank.sort((a, b) => b.score - a.score);
    return rank;
  }

  clickPlayAgainButton = () => {
    const { history, resScore } = this.props;
    history.push('/');
    resScore();
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map((rank, index) => (
          <div key={ index }>
            <img alt="gravatar" src={ rank.gravatar } />
            <p data-testid={ `player-name-${index}` }>{rank.name}</p>
            <p data-testid={ `player-score-${index}` }>{rank.score}</p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.clickPlayAgainButton }
        >
          Voltar ao inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  resScore: () => dispatch(resetScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
