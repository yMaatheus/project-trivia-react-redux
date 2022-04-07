import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenFetch, getQuestions } from '../services';
import { setToken, saveEmail, saveName, setQuestions } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.clickPlayButton = this.clickPlayButton.bind(this);
    this.state = {
      name: '',
      email: '',
      playerDisabled: true,
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

  clickSettingsButton = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateNameAndEmail);
  }

  async clickPlayButton() {
    const { saveToken, history, saveNameToState,
      saveEmailToState, loadQuestions } = this.props;
    const { email, name } = this.state;
    const token = await tokenFetch();
    saveToken(token);
    saveEmailToState(email);
    saveNameToState(name);
    console.log(`TOKEN: ${token}`);
    loadQuestions(await getQuestions(token));
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
            onClick={ () => this.clickSettingsButton() }
          >
            Configurações
          </button>
        </fieldset>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(setToken(token)),
  saveNameToState: (nameState) => dispatch(saveName(nameState)),
  saveEmailToState: (emailState) => dispatch(saveEmail(emailState)),
  loadQuestions: (questions) => dispatch(setQuestions(questions)),
});

Login.propTypes = {
  saveToken: PropTypes.func,
  saveEmailToState: PropTypes.func,
  saveNameToState: PropTypes.func,
  loadQuestions: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
