import React, { useEffect } from "react";
import { loadUser } from "./redux/actions/auth";
import Routes from "./Routes";
import store from "./redux/store";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
