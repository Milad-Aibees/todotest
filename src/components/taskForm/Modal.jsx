import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { TaskForm } from "./TaskForm";
import { TaskListContext } from "../../contexts/TaskListContext";
import { modalType } from "../../constants";
import { TaskView } from "../taskView/TaskView";
import { DoneTasksList } from "../taskList/DoneTasksList";

const Modal = () => {
  const { openModal, setOpenModal } = useContext(TaskListContext);
  const modalContent = () => {
    if (openModal.type === modalType.view) {
      return <TaskView />;
    } else if (openModal.type === modalType.done) {
      return <DoneTasksList />;
    } else if (
      openModal.type === modalType.add ||
      openModal.type === modalType.edit
    ) {
      return <TaskForm />;
    }
    return <div></div>;
  };
  return (
    <div>
      <Dialog
        maxWidth="xl"
        open={openModal.value}
        onClose={() => setOpenModal({ value: false })}
      >
        <DialogContent>{modalContent()}</DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
