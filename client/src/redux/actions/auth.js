import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";

export const loadUser = () => async (dispatch) => {
  // console.log(localStorage.token);
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:4000/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (inputs) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  const body = JSON.stringify(inputs);

  try {
    const res = await axios.post(
      "http://localhost:4000/auth/register",
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    // localStorage.setItem("token", res);
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (inputs) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  const body = JSON.stringify(inputs);

  try {
    const res = await axios.post(
      "http://localhost:4000/auth/login",
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    // localStorage.setItem("token", res);
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
