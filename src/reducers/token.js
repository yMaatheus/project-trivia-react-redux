import { SET_TOKEN } from '../actions';

const FIRST_STATE = '';

const token = (state = FIRST_STATE, action) => {
  switch (action.type) {
  case SET_TOKEN:
    return action.payload;
  default:
    return state;
  }
};

export default token;
