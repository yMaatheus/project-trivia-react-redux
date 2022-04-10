import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  handleAvatar = () => {
    const { email } = this.props;
    const emailHash = md5(email).toString();
    const avatarLink = `https://www.gravatar.com/avatar/${emailHash}`;
    return avatarLink;
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <h1>Header</h1>
        <span data-testid="header-player-name">{ name }</span>
        <img
          data-testid="header-profile-picture"
          src={ this.handleAvatar() }
          alt="avatar"
        />
        <strong data-testid="header-score">{score}</strong>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
