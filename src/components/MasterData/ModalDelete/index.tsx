import React from "react";
import { Modal, Button, Typography } from "@mui/material";
import { deleteRuas } from "@/services/Ruas";
import { ruasDelete } from "@/lib/deleteRuas";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  message?: string;
  id: number;
};

const ModalDelete: React.FC<Props> = ({
  isOpen,
  onClose,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  id,
}) => {
    console.log(id);
    
  const handleDelete = async () => {
    const resp = await ruasDelete(id);
    onClose()
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="modal-container bg-white p-4 rounded-lg md:w-96 w-full">
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
        <div className="mt-4 flex justify-end">
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
