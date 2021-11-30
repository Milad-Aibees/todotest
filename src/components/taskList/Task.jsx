import React, { useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import Button from "@mui/material/Button";
import { TaskListContext } from "../../contexts/TaskListContext";
import { modalType, bulletCollor } from "../../constants";

export const Task = ({ title, description, priority, isComplete, id }) => {
  const { findTask, setOpenModal, doneTask } = useContext(TaskListContext);

  const handleEditTask = () => {
    findTask(id, modalType.edit);
    setOpenModal({ value: true, type: modalType.edit });
  };

  const handleViewTask = () => {
    findTask(id, modalType.view);
    setOpenModal({ value: true, type: modalType.view });
  };

  return (
    <Card sx={{ display: "flex", width: "700px", mt: "16px" }}>
      <CardContent
        sx={{ display: "flex", width: "100%", flexDirection: "row" }}
      >
        <Box sx={{ width: "100%" }} onClick={() => handleViewTask()}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ mt: 2 }}
          >
            {description}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography fontSize={12} component="span">
              {priority}
            </Typography>
            <Brightness1Icon sx={{ color: bulletCollor(priority), ml: 1 }} />
          </Box>
          {!isComplete && (
            <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
              <Button
                variant="contained"
                color="error"
                sx={{ minWidth: "110px" }}
                onClick={() => doneTask(id)}
              >
                Done Task
              </Button>
              <Button
                sx={{ minWidth: "110px", ml: 1 }}
                variant="contained"
                color="success"
                onClick={() => handleEditTask()}
              >
                Edit Task
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
