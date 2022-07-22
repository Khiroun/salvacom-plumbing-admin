import { Button, TableCell } from "@mui/material";
import { FC, useState } from "react";
import { updateDocument } from "../../../firebase";
import LocationCell from "./LocationCell";
import ServiceCell from "./ServiceCell";

type Props = {
  commande: {
    [key: string]: string;
  };
};
const Row: FC<Props> = ({ commande }) => {
  const [updating, setUpdating] = useState(false);
  return (
    <>
      <TableCell>{commande.name}</TableCell>
      <TableCell>{commande.phone}</TableCell>
      <TableCell>{commande.address}</TableCell>
      <LocationCell siteId={commande.selectedLoc} />
      <ServiceCell serviceId={commande.selectedService} />

      <TableCell>
        <Button
          onClick={async () => {
            setUpdating(true);
            await updateDocument("commandes", commande.id, {
              status: "confirmed",
            });
            setUpdating(false);
          }}
          disabled={updating}
        >
          {updating ? "En cours..." : "Confirmer"}
        </Button>
      </TableCell>
    </>
  );
};

export default Row;
