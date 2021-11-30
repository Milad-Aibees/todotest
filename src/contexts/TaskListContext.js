import React, { createContext, useState, useEffect } from "react";
import { modalType } from "../constants";
import { v4 as uuidv4 } from "uuid";

export const TaskListContext = createContext();
export const TaskListContextProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, setTasks] = useState(initialState);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const [openModal, setOpenModal] = useState({
    value: false,
    type: modalType.add,
  });
  const [editItem, setEditItem] = useState(null);

  const [viewItem, setViewItem] = useState(null);

  const addTask = (title, description, priority) => {
    setTasks([
      ...tasks,
      { title, description, priority, isComplete: false, id: uuidv4() },
    ]);
    setOpenModal({
      value: false,
      type: modalType.add,
    });
  };

  // Find task
  const findTask = (id, type) => {
    const task = tasks.find((task) => task.id === id);
    type === modalType.edit ? setEditItem(task) : setViewItem(task);
  };

  // Edit task
  const editTask = (title, description, priority, isComplete, id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { title, description, priority, isComplete, id } : task
    );

    setTasks(newTasks);
    setOpenModal({
      value: false,
      type: modalType.edit,
    });
    setEditItem(null);
  };

  const doneTask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: true } : task
    );
    setTasks(newTasks);
    setOpenModal({
      value: false,
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setOpenModal({
      value: false,
    });
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        openModal,
        setOpenModal,
        addTask,
        findTask,
        editTask,
        editItem,
        viewItem,
        doneTask,
        deleteTask,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};
