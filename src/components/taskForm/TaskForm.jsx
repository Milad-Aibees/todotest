import React, { useState, useContext, useEffect } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TaskListContext } from "../../contexts/TaskListContext";
import { useFormValidate } from "../../hooks/useFormValidate";
import { radioButtons, modalType } from "../../constants";

export const TaskForm = () => {
  const [priority, setPriority] = useState("LOW");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask, openModal, editItem, editTask } =
    useContext(TaskListContext);
  const { handleInputValue, formIsValid, errors } = useFormValidate();

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setDescription(editItem.description);
      setPriority(editItem.priority);
    }
  }, [editItem]);

  const handleRadioChange = (event) => {
    setPriority(event.target.value);
  };

  const handleInputChange = (e) => {
    handleInputValue(e);
    e.target.name === "title"
      ? setTitle(e.target.value)
      : setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check modal is in edit mode or add mode
    if (openModal.type === modalType.add) {
      addTask(title, description, priority);
    } else {
      editTask(title, description, priority, editItem.isComplete, editItem.id);
    }
  };

  const controlProps = (item) => ({
    checked: priority === item,
    onChange: handleRadioChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const renderRadioButtonFields = radioButtons.map(({ value, color }) => {
    return (
      <FormControlLabel
        key={value}
        value={value}
        control={
          <Radio
            {...controlProps(value)}
            sx={{
              "&.Mui-checked": {
                color: color[600],
              },
            }}
          />
        }
        label={value}
      />
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={title}
        onBlur={handleInputValue}
        onChange={(e) => handleInputChange(e)}
        name="title"
        label="Task Title"
        autoComplete="none"
        fullWidth
        sx={{ mt: 2 }}
        variant="standard"
        {...(errors["title"] && {
          error: true,
          helperText: errors["title"],
        })}
      />
      <TextField
        value={description}
        onBlur={handleInputValue}
        onChange={(e) => handleInputChange(e)}
        name="description"
        label="Task Description"
        multiline
        rows={2}
        autoComplete="none"
        fullWidth
        sx={{ mt: 2 }}
        variant="standard"
        {...(errors["description"] && {
          error: true,
          helperText: errors["description"],
        })}
      />

      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={priority}
        onChange={handleRadioChange}
        row
        sx={{ justifyContent: "space-between", mt: 2 }}
      >
        {renderRadioButtonFields}
      </RadioGroup>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button disabled={!formIsValid()} type="submit">
          {openModal.type === modalType.add ? "ADD TO TASKS" : "EDIT TASK"}
        </Button>
      </Box>
    </form>
  );
};
