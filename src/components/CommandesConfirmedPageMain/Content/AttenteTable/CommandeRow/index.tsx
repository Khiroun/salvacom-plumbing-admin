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
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const goToDonePage = () => {
    router.push("/commandes/done");
  };
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
        <Button
          onClick={async () => {
            const prix = parseInt(prompt("Veuillez entrer le prix"));
            if (!prix) return alert("Prix non valide");
            setUpdating(true);
            await updateDocument("commandes", commande.id, {
              status: "done",
              doneDate: Date(),
              prix: prix,
            });
            setUpdating(false);
            goToDonePage();
          }}
        >
          Service Fait
        </Button>
        <CommandeDetailsModal commande={commande} />
      </TableCell>
    </>
  );
};

export default CommandeRow;
