import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  clickPlayAgainButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <Header />
        <button
          data-testid="btn-play-again"
          label="Play Again"
          type="button"
          name="button play again"
          onClick={ this.clickPlayAgainButton }
        />
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
