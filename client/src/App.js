import React, { useEffect } from "react";
import { loadUser } from "./redux/actions/auth";
import Routes from "./Routes";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
