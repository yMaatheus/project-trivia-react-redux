import { INCREMENT_SCORE } from '../actions';

const FIRST_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = FIRST_STATE, action) => {
  switch (action.type) {
  case INCREMENT_SCORE:
    console.log('Hello world');
    return {
      ...state,
      score: (state.score + action.payload),
    };
  default:
    return state;
  }
};

export default player;
