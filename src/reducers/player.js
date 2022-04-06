import { SAVE_EMAIL, SAVE_NAME } from '../actions';

const FIRST_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  token: '',
};

const player = (state = FIRST_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case SAVE_NAME:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default player;
