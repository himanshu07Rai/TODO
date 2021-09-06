import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteTodo, selectTodo } from "../../redux/actions/dashboard";

const StyledUl = styled.ul`
  padding: 0;
`;

const StyledLi = styled.li`
  display: flex;
  list-style: none;
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledButton = styled.button`
  float: right;
  background: palevioletred;
  color: #fff;
  border-radius: 3px;
  border: 2px solid palevioletred;
  padding: 3px 10px;
  outline: none;
  cursor: pointer;
`;

const ListTodos = ({ todos }) => {
  const localTodos = todos.filter((todo) => todo.todo_id !== null);
  const dispatch = useDispatch();
  // const toEdit = useSelector((state) => state.dashboard.toEdit);
  const onDeleteClick = (id) => {
    // console.log(id);
    dispatch(deleteTodo(id));
  };
  //   console.log(todos);
  //   console.log(localTodos);

  const handleEditClick = (id) => {
    dispatch(selectTodo(id));
  };
  if (todos) {
    if (localTodos.length === 0) return <h1>No todos!</h1>;
    else {
      return (
        <StyledUl>
          {localTodos.map((todo) => (
            <StyledLi key={todo.todo_id}>
              {todo.description}
              <StyledButton
                type="button"
                onClick={(e) => handleEditClick(todo.todo_id)}
              >
                Edit
              </StyledButton>
              <StyledButton
                type="button"
                onClick={() => onDeleteClick(todo.todo_id)}
              >
                Delete
              </StyledButton>
            </StyledLi>
          ))}
        </StyledUl>
      );
    }
  } else return <h1>Loading</h1>;
};

export default ListTodos;
