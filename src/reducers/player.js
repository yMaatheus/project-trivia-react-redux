import { SAVE_EMAIL, SAVE_NAME, SET_QUESTIONS } from '../actions';

const FIRST_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  questions: [],
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
  case SET_QUESTIONS:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
};

export default player;
