import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteTodo, selectTodo } from "../../redux/actions/dashboard";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px auto;
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(255, 118, 20, 1) 0%,
    rgba(255, 84, 17, 1) 100%
  );

  padding: 16px;
  border-radius: 5px;
  width: 90%;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
`;

const ListTodos = ({ todos }) => {
  // console.log("td", todos);
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
              <Icons>
                <FaEdit
                  className="edit-icon"
                  onClick={(e) => handleEditClick(todo.todo_id)}
                />

                <AiFillDelete
                  className="delete-icon"
                  onClick={() => onDeleteClick(todo.todo_id)}
                />
              </Icons>
            </StyledLi>
          ))}
        </StyledUl>
      );
    }
  } else return <h1>Loading</h1>;
};

export default ListTodos;
