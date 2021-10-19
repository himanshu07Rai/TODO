import React, { useEffect } from "react";
import { loadUser } from "./redux/actions/auth";
import Routes from "./Routes";
import { useDispatch } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
