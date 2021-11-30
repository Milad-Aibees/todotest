import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TaskListContext } from "../../contexts/TaskListContext";
import { modalType } from "../../constants";
import { Task } from "./Task";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export const TaskList = () => {
  const { tasks, setOpenModal } = useContext(TaskListContext);
  const completeTasks = tasks.filter((task) => task.isComplete === true);
  const renderTask = tasks.map((task) => {
    if (!task.isComplete) {
      return (
        <Task
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          id={task.id}
        />
      );
    }
    return <div key={task.id}></div>;
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 16,
        flexWrap: "wrap",
      }}
    >
      {completeTasks.length > 0 && (
        <Box sx={{ width: "700px" }}>
          <Button
            variant="contained"
            onClick={() => setOpenModal({ value: true, type: modalType.done })}
          >
            View Done Tasks
          </Button>
        </Box>
      )}
      {tasks.length > 0 ? (
        <>
          {renderTask}
          <Fab
            sx={{ position: "fixed", bottom: "50px", right: "100px" }}
            onClick={() => setOpenModal({ value: true, type: modalType.add })}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => setOpenModal({ value: true, type: modalType.add })}
        >
          Create Your First Task
        </Button>
      )}
    </Box>
  );
};
