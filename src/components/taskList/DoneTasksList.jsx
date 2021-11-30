import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { TaskListContext } from "../../contexts/TaskListContext";
import { Task } from "./Task";

export const DoneTasksList = () => {
  const { tasks } = useContext(TaskListContext);
  const completeTasks = tasks.filter((task) => task.isComplete === true);
  const randerDoneTasks = completeTasks.map((task) => {
    return (
      <Task
        key={task.id}
        title={task.title}
        description={task.description}
        priority={task.priority}
        id={task.id}
        isComplete={task.isComplete}
      />
    );
  });
  return (
    <div>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Done Taks
      </Typography>
      {randerDoneTasks}
    </div>
  );
};
