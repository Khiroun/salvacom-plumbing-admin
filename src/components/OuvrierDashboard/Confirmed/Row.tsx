import { Button, TableCell } from "@mui/material";
import { FC, useState } from "react";
import { updateDocument } from "../../../firebase";
import LocationCell from "./LocationCell";
import ServiceCell from "./ServiceCell";

type Props = {
  commande: {
    [key: string]: string;
  };
  goToDonePage: () => void;
};
const Row: FC<Props> = ({ commande, goToDonePage }) => {
  const [updating, setUpdating] = useState(false);
  return (
    <>
      <TableCell>{commande.name}</TableCell>
      <TableCell>{commande.phone}</TableCell>
      <TableCell>{commande.address}</TableCell>
      <LocationCell siteId={commande.selectedLoc} />
      <ServiceCell serviceId={commande.selectedService} />
      <TableCell>{commande.prix}</TableCell>
      <TableCell>
        <Button
          onClick={async () => {
            setUpdating(true);
            await updateDocument("commandes", commande.id, {
              status: "done",
              doneDate: Date(),
            });
            setUpdating(false);
            goToDonePage();
          }}
          disabled={updating}
        >
          {updating ? "En cours..." : "Service terminé"}
        </Button>
      </TableCell>
    </>
  );
};

export default Row;
