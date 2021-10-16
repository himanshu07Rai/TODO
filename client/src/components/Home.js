import React from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

const Home = () => {
  return (
    <div>
      <Alert />
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
