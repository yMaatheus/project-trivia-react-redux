import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     isLoading: true,
  //   };
  // }

  handleAvatar = () => {
    const { email } = this.props;
    const emailHash = md5(email).toString();
    const avatarLink = `https://www.gravatar.com/avatar/${emailHash}`;
    return avatarLink;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h1>Header</h1>
        <span data-testid="header-player-name">{ name }</span>
        <img
          data-testid="header-profile-picture"
          src={ this.handleAvatar() }
          alt="avatar"
        />
        <strong data-testid="header-score">0</strong>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
