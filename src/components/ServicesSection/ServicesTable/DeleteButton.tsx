import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { AiFillDelete } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, useState } from "react";
import { deleteDocument } from "../../../firebase";

type Props = {
  id: string;
};
const DeleteButton: FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    await deleteDocument("services", id);
    handleClose();
  };
  return (
    <>
      <IconButton color="error" onClick={() => setOpen(true)} href="">
        <AiFillDelete />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Supprimer le service"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            etes vous sur de vouloir supprimer ce service
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
            Oui
          </Button>
          <Button onClick={handleClose} autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
