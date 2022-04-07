import { SAVE_EMAIL, SAVE_NAME, SET_QUESTIONS, INCREMENT_SCORE } from '../actions';

const FIRST_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  questions: [],
};

const player = (state = FIRST_STATE, action) => {
  switch (action.type) {
  case INCREMENT_SCORE:
    return {
      ...state,
      score: (state.score + action.payload) };
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
