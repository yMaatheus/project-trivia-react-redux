import { tokenFetch } from '../services';

export const SET_TOKEN = 'SET_TOKEN';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_NAME = 'SAVE_NAME';

const setToken = (payload) => ({ type: SET_TOKEN, payload });

export const saveEmail = (payload) => ({ type: SAVE_EMAIL, payload });
export const saveName = (payload) => ({ type: SAVE_NAME, payload });

export const handleToken = () => async (dispatch) => {
  const token = await tokenFetch();
  dispatch(setToken(token));
};
