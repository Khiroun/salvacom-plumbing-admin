import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

import OuvrierCell from "./OuvrierCell";
import SiteCell from "./SiteCell";
import { FC, useState } from "react";
import { deleteDocument, updateDocument } from "../../../../../firebase";
import CommandeDetailsModal from "../../../../CommandeDetailsModal";
import { useRouter } from "next/router";
type Props = {
  commande: {
    [key: string]: any;
  };
};
const CommandeRow: FC<Props> = ({ commande }) => {
  const [deleting, setDeleting] = useState(false);
  const [validating, setValidating] = useState(false);
  const router = useRouter();
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
          disabled={validating}
          onClick={async () => {
            setValidating(true);
            await updateDocument("commandes", commande.id, {
              status: "confirmed",
            });
            setValidating(false);
            router.push("/commandes/confirmed");
          }}
        >
          {validating ? "Validation..." : "Valider"}
        </Button>
        <Button
          color="error"
          onClick={async () => {
            setDeleting(true);
            await updateDocument("commandes", commande.id, {
              status: "reception",
            });
            setDeleting(false);
            router.push("/commandes");
          }}
          disabled={deleting}
        >
          {deleting ? "..." : "Annuler"}
        </Button>
        <CommandeDetailsModal commande={commande} />
      </TableCell>
    </>
  );
};

export default CommandeRow;
