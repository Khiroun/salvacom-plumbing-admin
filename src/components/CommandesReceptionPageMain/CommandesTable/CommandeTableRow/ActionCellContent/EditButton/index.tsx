import { FC, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MUITextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { getDocument, updateDocument } from "../../../../../../firebase";
import styled from "@emotion/styled";
import ServiceInput from "./ServiceInput";
import { CircularProgress } from "@mui/material";
import SubServiceInput from "./SubServiceInput";

type Props = {
  commandeId: string;
};
const EditButton: FC<Props> = ({ commandeId }) => {
  const [open, setOpen] = useState(false);
  const [commande, setCommande] = useState<{
    [x: string]: string;
  }>({});
  const [newValues, setNewValues] = useState<{
    [x: string]: string;
  }>({});
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    getDocument("commandes", commandeId).then((commande) => {
      setCommande(commande);
      setNewValues({
        ...commande,
      });
    });
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const modifier = async () => {
    console.log(newValues);
    setUpdating(true);
    await updateDocument("commandes", commandeId, newValues);
    setUpdating(false);
    setOpen(false);
  };
  if (updating) return <CircularProgress />;
  return (
    <>
      <MenuItem
        sx={{
          color: "green",
        }}
        onClick={handleOpen}
      >
        Modifier
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Modifier La commande"}</DialogTitle>
        <DialogContent>
          <Box marginTop="1em">
            <TextField
              label="Nom Et Prénom"
              value={newValues.name}
              fullWidth
              onChange={(e) => {
                setNewValues({
                  ...newValues,
                  name: e.target.value,
                });
              }}
            />
            <TextField
              label="Adresse"
              value={newValues.address}
              fullWidth
              onChange={(e) => {
                setNewValues({
                  ...newValues,
                  address: e.target.value,
                });
              }}
            />
            <TextField
              label="Tél"
              value={newValues.phone}
              fullWidth
              onChange={(e) => {
                setNewValues({
                  ...newValues,
                  phone: e.target.value,
                });
              }}
              type="tel"
            />

            <ServiceInput
              serviceId={newValues.selectedService}
              handleChange={(service: string) => {
                setNewValues({
                  ...newValues,
                  selectedService: service,
                });
              }}
              value={newValues.selectedService}
            />
            <SubServiceInput
              serviceId={newValues.selectedService}
              handleChange={(subService: string) => {
                setNewValues({
                  ...newValues,
                  selectedSubService: subService,
                });
              }}
              value={newValues.selectedSubService}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={modifier} autoFocus>
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const TextField = styled(MUITextField)`
  margin-bottom: 1em;
`;

export default EditButton;
