import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/"><Login /></Route>
      <Route path="/game"><Game /></Route>
      <Route path="/settings"><Settings /></Route>
    </Switch>
  );
}