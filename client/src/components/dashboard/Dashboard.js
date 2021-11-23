import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../../redux/actions/auth";
import { loadData } from "../../redux/actions/dashboard";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";
import { RiLogoutBoxLine } from "react-icons/ri";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 520px;
  min-height: 600px;
  background: #161a2b;
  text-align: center;
  margin: 128px auto;
  border-radius: 10px;
  padding-bottom: 32px;

  @media (max-width: 400px) {
    width: 90vw;
  }
`;

const Logout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: 30px;
  z-index: 20;
  margin: 20px;
`;

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
      <Logout>
        <RiLogoutBoxLine onClick={() => dispatch(logout())} />
      </Logout>
      <Container>
        <h1>Hi {user.user_name} ,What's the Plan for Today?</h1>

        <AddTodo />
        <ListTodos todos={data} />
      </Container>
    </>
  );
};

export default Dashboard;
