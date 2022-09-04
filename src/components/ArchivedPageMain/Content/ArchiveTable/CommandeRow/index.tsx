import TableCell from "@mui/material/TableCell";

import OuvrierCell from "./OuvrierCell";
import SiteCell from "./SiteCell";
import { FC } from "react";
import CommandeDetailsModal from "../../../../CommandeDetailsModal";
type Props = {
  commande: {
    [key: string]: string;
  };
};
const CommandeRow: FC<Props> = ({ commande }) => {
  return (
    <>
      <OuvrierCell ouvrierId={commande.ouvrier} />
      <TableCell>{commande.name}</TableCell>
      <TableCell>{commande.phone}</TableCell>

      <SiteCell siteId={commande.selectedLoc} />
      <TableCell>{commande.prix}</TableCell>

      <TableCell>
        <CommandeDetailsModal commande={commande} />
      </TableCell>
    </>
  );
};

export default CommandeRow;
