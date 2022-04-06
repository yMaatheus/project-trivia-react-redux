import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenFetch } from '../services';
import { handleToken, saveEmail, saveName } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      playerDisabled: true,
    };
  }

  async componentDidMount() {
    console.log(await tokenFetch());
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

  clickSettingsButton = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateNameAndEmail);
  }

  clickPlayButton = () => {
    const { saveToken, history, saveNameToState, saveEmailToState } = this.props;
    saveToken();
    const { email, name } = this.state;
    saveEmailToState(email);
    saveNameToState(name);
    history.push('/game');
  }

  render() {
    const { playerDisabled } = this.state;
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
            onClick={ this.clickPlayButton }
          >
            Jogar
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            label="Configurar"
            onClick={ this.clickSettingsButton }
          >
            Configurações
          </button>
        </fieldset>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveToken: () => dispatch(handleToken()),
  saveNameToState: (nameState) => dispatch(saveName(nameState)),
  saveEmailToState: (emailState) => dispatch(saveEmail(emailState)),
});

Login.propTypes = {
  saveToken: PropTypes.func.isRequired,
  saveEmailToState: PropTypes.func.isRequired,
  saveNameToState: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
