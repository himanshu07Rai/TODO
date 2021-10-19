import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { loadData } from "../../redux/actions/dashboard";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadData());
    };
    fetchData();
  }, [user, dispatch]);

  const loading = useSelector((state) => state.auth.loading);
  const data = useSelector((state) => state.dashboard.todos);
  if (loading) {
    return <h1>Loading</h1>;
  }
  console.log(data);

  // if (data.length === 0) return <h1>Loading</h1>;
  return (
    <>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <h1>Hi {user.user_name}</h1>
      <AddTodo />
      <ListTodos todos={data} />
    </>
  );
};

export default Dashboard;
