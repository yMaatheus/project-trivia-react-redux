import { tokenFetch } from '../services';

export const SET_TOKEN = 'SET_TOKEN';

const setToken = (payload) => ({ type: SET_TOKEN, payload });

export const handleToken = () => async (dispatch) => {
  const token = await tokenFetch();
  dispatch(setToken(token));
};
