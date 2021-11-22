import axios from "axios";
// import axiosApiInstance from "../../utils/interceptor";
import { v4 as uuidv4 } from "uuid";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_ALERT,
  REMOVE_ALERT,
} from "../types";

export const loadUser = () => async (dispatch) => {
  // console.log(localStorage.token);
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/auth");
    // console.log("from ", res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { id, msg: "Not authenticated", type: "Warning" },
    });

    dispatch({
      type: AUTH_ERROR,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, 1000);
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
    const res = await axios.post("/auth/register", body, config);
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
  // console.log("body:", body);

  try {
    const res = await axios.post("/auth/login", body, config);
    // console.log(res.data);  token
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log("1");
    dispatch(loadUser());
    console.log("2");

    // localStorage.setItem("token", res);
  } catch (err) {
    console.log(err.response.data);
    const id = uuidv4();
    const error = err.response.data.error;
    console.log(error);
    dispatch({
      type: SET_ALERT,
      payload: { id, msg: error.message, type: "Error" },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, 3000);
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
