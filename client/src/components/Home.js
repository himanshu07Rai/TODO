import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "./Alert";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Lets Todo It !</h1>
          <p className="lead">Structure your day and conquer every problem</p>
          <div className="buttons">
            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
