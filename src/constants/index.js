import { red, yellow, green } from "@mui/material/colors";

export const modalType = {
  add: "ADD",
  edit: "EDIT",
  view: "VIEW",
  done: "DONE",
};

export const radioButtons = [
  { value: "LOW", color: green },
  { value: "MEDIUM", color: yellow },
  { value: "HIGH", color: red },
];

export const bulletCollor = (priority) => {
  switch (priority) {
    case "LOW":
      return green[600];
    case "MEDIUM":
      return yellow[600];
    default:
      return red[600];
  }
};
