import {
  DATA_LOADED,
  LOGOUT,
  ADD_TODO,
  TODO_DELETED,
  SELECT_TODO,
  TEXT_CHANGE,
  EDIT_TODO,
} from "../types";

const initialState = {
  todos: [],
  text: "",
  selectedId: null,
};

const func = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_LOADED:
      return {
        ...state,
        todos: payload,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
        text: "",
      };
    case TODO_DELETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.todo_id !== payload),
      };
    case LOGOUT:
      return {
        ...state,
        todos: [],
      };
    case SELECT_TODO:
      const e = state.todos.filter((todo) => todo.todo_id === payload);
      console.log(payload);
      return {
        ...state,
        text: e[0].description,
        selectedId: payload,
      };
    case TEXT_CHANGE:
      return {
        ...state,
        text: payload,
      };
    case EDIT_TODO:
      console.log(payload);
      const index = state.todos.findIndex(
        (todo) => todo.todo_id === payload.todo_id
      );
      console.log(index);
      const newArray = [...state.todos];
      newArray[index].description = payload.description;
      return {
        ...state,
        todos: newArray,
        selectedId: null,
        text: "",
      };
    default:
      return state;
  }
};

export default func;
