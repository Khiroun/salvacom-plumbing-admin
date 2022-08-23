import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

import OuvrierCell from "./OuvrierCell";
import SiteCell from "./SiteCell";
import { FC, useState } from "react";
import { deleteDocument } from "../../../../../firebase";
type Props = {
  commande: {
    [key: string]: any;
  };
};
const CommandeRow: FC<Props> = ({ commande }) => {
  const [deleting, setDeleting] = useState(false);
  const maxPrice = commande.selectedService.reduce((acc, curr) => {
    return acc + curr.priceRange[1];
  }, 0);
  const minPrice = commande.selectedService.reduce((acc, curr) => {
    return acc + curr.priceRange[0];
  }, 0);
  return (
    <>
      <OuvrierCell ouvrierId={commande.ouvrier} />
      <TableCell>{commande.name}</TableCell>
      <TableCell>{commande.phone}</TableCell>
      <SiteCell siteId={commande.selectedLoc} />
      <TableCell>
        {minPrice} - {maxPrice}
      </TableCell>
      <TableCell>
        <Button
          color="error"
          onClick={async () => {
            setDeleting(true);
            await deleteDocument("commandes", commande.id);
            setDeleting(false);
          }}
          disabled={deleting}
        >
          {deleting ? "Suppression..." : "Supprimer"}
        </Button>
      </TableCell>
    </>
  );
};

export default CommandeRow;
