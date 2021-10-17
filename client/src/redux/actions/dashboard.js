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
    const res = await axios.get("/todos");
    // console.log("sdfsf", [...res.data.Todo]);
    dispatch({
      type: DATA_LOADED,
      payload: res.data.Todo,
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
    const res = await axios.post("/todos", body, config);
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
    await axios.delete(`/todos/${id}`);
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
      const res = await axios.put(`/todos/${selectedId}`, body, config);
      console.log(res.data);
      dispatch({
        type: EDIT_TODO,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
