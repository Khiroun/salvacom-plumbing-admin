import { FC, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { getDocument, updateDocument } from "../../firebase";

import Notes from "./Notes";
import NotesInput from "./NotesInput";

type Props = {
  commande: any;
};
const CommandeDetailsModal: FC<Props> = ({ commande }) => {
  const [open, setOpen] = useState(false);
  const [ouvrierName, setOuvrierName] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState(() =>
    commande.notes ? commande.notes : []
  );
  const subServices = [];
  commande.selectedService &&
    commande.selectedService.map((subService) => {
      if (!subServices.includes(subService.name))
        subServices.push(subService.name);
    });

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
  return (
    <div>
      <Button onClick={handleClickOpen}>Détails</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Détails de la commande</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            Nom : {commande.name}
            <br />
            Tél: {commande.phone}
            <br />
            Adresse: {commande.address}
            <br />
            {ouvrierName && (
              <>
                Ouvrier: {ouvrierName} <br />
              </>
            )}
            Site : {location}
            <br />
            Services: <br />
            <span>
              {subServices.map((serviceName) => {
                return (
                  <span
                    key={serviceName}
                    style={{
                      display: "block",
                      marginLeft: "1em",
                    }}
                  >
                    {serviceName}
                  </span>
                );
              })}
            </span>
            {commande.notes && <Notes notes={notes} />}
            <NotesInput
              notes={notes}
              commandeId={commande.id}
              setNotes={setNotes}
            />
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
