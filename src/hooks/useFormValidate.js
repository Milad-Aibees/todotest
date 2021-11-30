import { useState, useContext } from "react";
import { TaskListContext } from "../contexts/TaskListContext";

export const useFormValidate = () => {
  const { editItem } = useContext(TaskListContext);
  const initialFormValues = {
    title: editItem?.title || "",
    description: editItem?.description || "",
    formSubmitted: false,
    success: false,
  };

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("title" in fieldValues) {
      temp.title = fieldValues.title ? "" : "This field is required.";
    }

    if ("description" in fieldValues) {
      temp.description = fieldValues.description
        ? ""
        : "This field is required.";
    }

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.title &&
      fieldValues.description &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };
  return {
    handleInputValue,
    formIsValid,
    errors,
  };
};
