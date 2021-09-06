import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isAuthenticated && !auth.loading) return <Redirect to="/login" />;
  return <Component />;
};

export default PrivateRoute;
