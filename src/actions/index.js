import { tokenFetch } from '../services';

export const SET_TOKEN = 'SET_TOKEN';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';

const setToken = (payload) => ({ type: SET_TOKEN, payload });
export const incrementScore = (payload) => ({ type: INCREMENT_SCORE, payload });

export const handleToken = () => async (dispatch) => {
  const token = await tokenFetch();
  dispatch(setToken(token));
};
