import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { loadData } from "../../redux/actions/dashboard";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";

const Dashboard = () => {
  // const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const fetchData = async () => {
    // console.log(axios.defaults.headers.common["auth-token"]);

    // const res = await axios.get("http://localhost:4000/todos");
    // console.log(res.data);
    // setData(res.data);
    dispatch(loadData());
  };
  useEffect(() => {
    // console.log("j");
    fetchData();
  }, [user]);

  const loading = useSelector((state) => state.auth.loading);
  const data = useSelector((state) => state.dashboard.todos);
  if (loading) {
    return <h1>Loading</h1>;
  }
  // console.log(data);

  if (data.length === 0) return <h1>Loading</h1>;
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
