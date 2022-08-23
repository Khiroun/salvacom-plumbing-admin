import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getDocument } from "../../firebase";

type Props = {
  commande: any;
};
const CommandeDetailsModal: FC<Props> = ({ commande }) => {
  const [open, setOpen] = useState(false);
  const [ouvrierName, setOuvrierName] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    commande.ouvrier &&
      getDocument("ouvriers", commande.ouvrier).then((ouvrier) => {
        setOuvrierName(ouvrier.firstName + " " + ouvrier.lastName);
      });
  }, []);
  useEffect(() => {
    commande.selectedLoc &&
      getDocument("sites", commande.selectedLoc).then((site) => {
        setLocation(site.siteName);
      });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(commande);
  return (
    <div>
      <Button onClick={handleClickOpen}>Détails</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Détails de la commande</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nom : {commande.name}
            <br />
            Tél: {commande.phone}
            <br />
            Adresse: {commande.address}
            <br />
            Ouvrier: {ouvrierName}
            <br />
            Site : {location}
            <br />
            Service: <br />
            <ul>
              {commande.selectedService &&
                commande.selectedService.map((service) => {
                  return <li>{service.name}</li>;
                })}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommandeDetailsModal;
