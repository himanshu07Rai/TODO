import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f3f3;
`;

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 50px;
  width: 100%;
  max-width: 450px;
  border-radius: 15px;
  background-color: #ffff;
  text-align: center;

  h2 {
    font-size: 50px;
    font-weight: 800;
    margin-bottom: 50px;
  }
  span {
    display: block;
    margin-top: 40px;
    color: #888888;
    font-size: 18px;
  }
  a {
    margin-left: 4px;
    color: #2f8bfd;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

const StyledForm = styled.form`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  transition: transform 0.2s;
  border: none;
  border-bottom: 1px solid #000;
  /* border-radius: 10px; */
  padding: 10px;
  margin: 5px;
  font-size: 17px;
  width: 250px;
  &:hover {
    transform: scale(1.1);
  }
`;

const Button = styled.button`
  transition: transform 0.2s;
  font-size: 17px;
  border: #fff;
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px 20px;
  display: block;
  cursor: pointer;
  background-color: blueviolet;
  color: #fff;
  &:hover {
    transform: scale(1.2);
  }
`;

export { Container, Card, StyledForm, StyledInput, Button };
