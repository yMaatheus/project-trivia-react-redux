import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      playerDisabled: true,
      btnSettingsDisabled: false,
    };
  }

  isNameValid = () => {
    const { name } = this.state;

    return name.length > 0;
  }

  isEmailValid = () => {
    const { email } = this.state;
    const regexEmail = /[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

    return regexEmail.test(email);
  }

  validateNameAndEmail = () => {
    this.setState({ playerDisabled: !this.isNameValid() || !this.isEmailValid() });
  }

  // Setor de direcionar botão
  btnSettingsRedirect = () => {
    this.setState({ btnSettingsDisabled: true });
  }


  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateNameAndEmail);
  }

  render() {
    const { playerDisabled, btnSettingsDisabled } = this.state;

    return (
      <div>
        <fieldset>
          <input
            data-testid="input-player-name"
            label="Nome: "
            type="text"
            name="name"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            label="Email: "
            type="email"
            name="email"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="button"
            label="Jogar"
            disabled={ playerDisabled }
          >
            Jogar
          </button>
          <button
          data-testid="btn-settings"
          type='button'
          label="Configurar"
          disabled={ btnSettingsRedirect }
          >
            Configurações
          </button>
          { btnSettingsDisabled && <Redirect to="/settings" /> }
        </fieldset>
      </div>
    );
  }
}

export default Login;
