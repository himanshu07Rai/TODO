import axios from "axios";
import {
  DATA_LOADED,
  ADD_TODO,
  TODO_DELETED,
  SELECT_TODO,
  TEXT_CHANGE,
  EDIT_TODO,
} from "../types";

export const textChange = (text) => (dispatch) => {
  dispatch({
    type: TEXT_CHANGE,
    payload: text,
  });
};

export const loadData = () => async (dispatch) => {
  try {
    // console.log(axios.defaults.headers.common["auth-token"]);

    // const res = await axios.get("http://localhost:4000/todos");

    const res = await axios.get("http://localhost:4000/todos");
    // console.log(res.data);
    dispatch({
      type: DATA_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
    // dispatch({
    //   type: AUTH_ERROR,
    // });
  }
};

export const addTodo = (desc) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    const body = JSON.stringify(desc);
    const res = await axios.post("http://localhost:4000/todos", body, config);
    console.log(res.data);
    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    // console.log(id);
    await axios.delete(`http://localhost:4000/todos/${id}`);
    // console.log(res.data);
    dispatch({
      type: TODO_DELETED,
      payload: id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const selectTodo = (id) => (dispatch) => {
  console.log(id);
  try {
    dispatch({
      type: SELECT_TODO,
      payload: id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const editTodo =
  ({ description, selectedId }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "Application/json",
        },
      };
      console.log({ description });

      const body = JSON.stringify({ description });
      console.log(body);
      const res = await axios.put(
        `http://localhost:4000/todos/${selectedId}`,
        body,
        config
      );
      console.log(res.data);
      dispatch({
        type: EDIT_TODO,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
