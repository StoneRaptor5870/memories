import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const signin = (formData, Navigate) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    Navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, Navigate) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    Navigate("/");
  } catch (error) {
    console.log(error);
  }
};
