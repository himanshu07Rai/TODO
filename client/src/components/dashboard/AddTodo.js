import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addTodo, editTodo, textChange } from "../../redux/actions/dashboard";

const StyledForm = styled.form`
  /* padding: 1.2rem 0; */
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  font-size: 17px;
  width: 90%;
`;

const Button = styled.button`
  margin-right: 10px;
  transition: transform 0.2s;
  font-size: 17px;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #0f6;
  color: #fff;
  &:hover {
    transform: scale(1.2);
  }
`;
const AddTodo = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.dashboard.text);
  const selectedId = useSelector((state) => state.dashboard.selectedId);
  console.log(selectedId);

  console.log(description);
  // const [description, setDescription] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(description);
    if (selectedId) {
      dispatch(editTodo({ description, selectedId }));
    } else {
      dispatch(addTodo({ description }));
    }
  };
  return (
    <>
      <StyledForm onSubmit={(e) => onSubmit(e)}>
        <StyledInput
          type="text"
          placeholder="Description.."
          value={description}
          onChange={(e) => dispatch(textChange(e.target.value))}
        />
        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </StyledForm>
    </>
  );
};

export default AddTodo;
