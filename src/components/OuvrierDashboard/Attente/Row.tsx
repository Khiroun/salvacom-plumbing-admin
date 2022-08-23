import { Button, TableCell, TextField } from "@mui/material";
import { FC, useState } from "react";
import { updateDocument } from "../../../firebase";
import LocationCell from "./LocationCell";

type Props = {
  commande: {
    [key: string]: any;
  };
  goToConfirmedPage: () => void;
};
const Row: FC<Props> = ({ commande, goToConfirmedPage }) => {
  const [updating, setUpdating] = useState(false);
  const [prix, setPrix] = useState(0);
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
        <TextField
          label="Prix"
          type="number"
          value={prix}
          onChange={(e) => {
            setPrix(parseInt(e.target.value));
          }}
        />
      </TableCell>
      <TableCell>
        <Button
          onClick={async () => {
            setUpdating(true);
            await updateDocument("commandes", commande.id, {
              status: "confirmed",
              prix: prix,
            });
            setUpdating(false);
            goToConfirmedPage();
          }}
          disabled={!prix || updating}
        >
          {updating ? "En cours..." : "Confirmer"}
        </Button>
      </TableCell>
    </>
  );
};

export default Row;
