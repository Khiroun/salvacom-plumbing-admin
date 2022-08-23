import { Button, TableCell } from "@mui/material";
import { FC, useState } from "react";
import { updateDocument } from "../../../firebase";
import CommandeDetailsModal from "../../CommandeDetailsModal";
import LocationCell from "./LocationCell";

type Props = {
  commande: {
    [key: string]: any;
  };
  goToDonePage: () => void;
};
const Row: FC<Props> = ({ commande, goToDonePage }) => {
  const [updating, setUpdating] = useState(false);
  const maxPrice = commande.selectedService.reduce((acc, curr) => {
    return acc + curr.priceRange[1];
  }, 0);
  const minPrice = commande.selectedService.reduce((acc, curr) => {
    return acc + curr.priceRange[0];
  }, 0);
  return (
    <>
      <TableCell>{commande.name}</TableCell>
      <TableCell>{commande.phone}</TableCell>
      <TableCell>{commande.address}</TableCell>
      <LocationCell siteId={commande.selectedLoc} />
      <TableCell>
        {minPrice} - {maxPrice}
      </TableCell>
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
        <CommandeDetailsModal commande={commande} />
      </TableCell>
    </>
  );
};

export default Row;
