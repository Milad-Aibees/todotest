import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { TaskListContext } from "../../contexts/TaskListContext";
import Typography from "@mui/material/Typography";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { bulletCollor, modalType } from "../../constants";
import Button from "@mui/material/Button";

export const TaskView = () => {
  const { viewItem, findTask, setOpenModal, doneTask, deleteTask } =
    useContext(TaskListContext);

  const handleEditTask = () => {
    findTask(viewItem.id, modalType.edit);
    setOpenModal({ value: true, type: modalType.edit });
  };
  return (
    <Box sx={{ width: "500px" }}>
      <Box sx={{ display: "flex", position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <Brightness1Icon
            sx={{ color: bulletCollor(viewItem.priority), mr: 1 }}
          />
          <Typography fontSize={12} component="span">
            {viewItem.priority}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: "1",
            justifyContent: "center",
          }}
        >
          <Typography fontSize={16} component="h3">
            {viewItem.title}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "80%", textAlign: "center", mt: 1 }}>
        <p>{viewItem.description}</p>
      </Box>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          color="success"
          size="small"
          variant="contained"
          onClick={() => handleEditTask()}
        >
          Edit Task
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => doneTask(viewItem.id)}
        >
          Done Task
        </Button>
        <Button
          color="error"
          size="small"
          variant="contained"
          onClick={() => deleteTask(viewItem.id)}
        >
          Delete Task
        </Button>
      </Box>
    </Box>
  );
};
