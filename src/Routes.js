import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
      </Switch>
    );
  }
}

export default Routes;
