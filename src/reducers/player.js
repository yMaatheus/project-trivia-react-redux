import { SET_TOKEN } from '../actions';

const FIRST_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  token: '',
};

const player = (state = FIRST_STATE, action) => {
  switch (action.type) {
  case SET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default player;
