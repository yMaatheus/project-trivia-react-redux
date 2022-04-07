import React from 'react';

class Feedback extends React.Component {
  constructor(){
    super()

    clickPlayAgainButton = () => {
      const { saveToken, history } = this.props;
      saveToken();
      history.push('/');
    }
  } // Fim do constructor
  render() {
    return (
    <fieldset data-testid="info-player">
      <header>
        <input
        data-testid="header-profile-picture"
        label="Imagem de Perfil"
        type="image"
        name="profile picture" 
        />

        <input
        data-testid="header-player-name"
        label="Jogador(a): "
        type="text"
        name="player"
        />

        <input
        data-testid="header-score"
        label="Pontuação: "
        type="number"
        name="score"
        />

        <button
        data-testid="btn-play-again"
        label="Play Again"
        type="button"
        name='button play again'
        onClick={ this.clickPlayAgainButton }
        />
      </header>
    </fieldset>
    );
  }
}

export default Feedback;
