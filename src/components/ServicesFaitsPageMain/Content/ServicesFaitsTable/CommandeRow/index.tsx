import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

import OuvrierCell from "./OuvrierCell";
import SiteCell from "./SiteCell";
import ServiceCell from "./ServiceCell";
import { FC, useState } from "react";
import { deleteDocument } from "../../../../../firebase";
type Props = {
  commande: {
    [key: string]: string;
  };
};
const CommandeRow: FC<Props> = ({ commande }) => {
  const [deleting, setDeleting] = useState(false);
  return (
    <>
      <OuvrierCell ouvrierId={commande.ouvrier} />
      <TableCell>{commande.name}</TableCell>
      <TableCell>{commande.phone}</TableCell>
      <SiteCell siteId={commande.selectedLoc} />
      <ServiceCell siteId={commande.selectedService} />
      <TableCell>{commande.selectedSubService}</TableCell>
    </>
  );
};

export default CommandeRow;
