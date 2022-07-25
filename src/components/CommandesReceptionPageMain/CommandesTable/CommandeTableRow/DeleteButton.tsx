import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, useState } from "react";
import { deleteDocument } from "../../../../firebase";

type Props = {
  commandeId: string;
};

const DeleteButton: FC<Props> = ({ commandeId }) => {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const deleteCommande = async () => {
    setDeleting(true);
    await deleteDocument("commandes", commandeId);
    setDeleting(false);
    setOpen(false);
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <MenuItem
        sx={{
          color: "red",
        }}
        onClick={handleOpen}
      >
        Annuler
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {deleting
            ? "Suppression en cours..."
            : "Voulez-vous vraiment annuler cette commande ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={deleteCommande} color="error" disabled={deleting}>
            Oui
          </Button>
          <Button onClick={handleClose} disabled={deleting}>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
