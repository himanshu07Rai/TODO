import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  StyledForm,
  StyledInput,
  Button,
} from "./syledComponents";
import { login } from "../redux/actions/auth";
import Alert from "./Alert";
const Login = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(inputs));
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Alert />
      <Card>
        <h2>Log in</h2>
        <StyledForm onSubmit={(e) => onSubmit(e)}>
          <StyledInput
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <StyledInput
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <Button type="submit">Submit</Button>
        </StyledForm>
        <span>
          Don't have an account ?<Link to="/register">Register</Link>
        </span>
      </Card>
    </Container>
  );
};

export default Login;
