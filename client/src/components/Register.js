import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Card,
  StyledForm,
  StyledInput,
  Button,
} from "./syledComponents";
import { register } from "../redux/actions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    // const config = {
    //   headers: {
    //     "Content-type": "Application/json",
    //   },
    // };

    // const body = JSON.stringify(inputs);

    // try {
    //   const res = await axios.post(
    //     "http://localhost:4000/auth/register",
    //     body,
    //     config
    //   );
    //   console.log(res.data);

    //   localStorage.setItem("token", res);
    // } catch (error) {
    //   console.log(error.message);
    // }
    dispatch(register(inputs));

    setInputs({
      name: "",
      email: "",
      password: "",
    });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <Card>
        <h2>Register</h2>
        <StyledForm onSubmit={(e) => onSubmit(e)}>
          <StyledInput
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <StyledInput
            type="email"
            placeholder="Email"
            value={email}
            name="email"
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
          Already have an account ?<Link to="/login">Log in</Link>
        </span>
      </Card>
    </Container>
  );
};

export default Register;
