import React from 'react';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  clickPlayAgainButton = () => {
    const { saveToken, history } = this.props;
    saveToken();
    history.push('/');
  };

  render() {
    return (
      <fieldset data-testid="info-player">
        <header>
          <button
            data-testid="btn-play-again"
            label="Play Again"
            type="button"
            name="button play again"
            onClick={ this.clickPlayAgainButton }
          />
        </header>
      </fieldset>
    );
  }
}

Feedback.propTypes = {
  saveToken: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Feedback;
