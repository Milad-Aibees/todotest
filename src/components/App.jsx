import React from "react";
import Container from "@mui/material/Container";
import { Header } from "./Header";
import { TaskList } from "./taskList/TaskList";
import Modal from "./taskForm/Modal";
import { TaskListContextProvider } from "../contexts/TaskListContext";
export const App = () => {
  return (
    <TaskListContextProvider>
      <Container>
        <Header />
        <TaskList />
        <Modal />
      </Container>
    </TaskListContextProvider>
  );
};
