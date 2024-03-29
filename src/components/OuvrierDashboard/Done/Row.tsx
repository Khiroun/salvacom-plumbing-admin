import { TableCell } from "@mui/material";
import { FC } from "react";
import formatDate from "../../../utils/formatDate";
import CommandeDetailsModal from "../../CommandeDetailsModal";
import LocationCell from "./LocationCell";

type Props = {
  commande: {
    [key: string]: any;
  };
};
const Row: FC<Props> = ({ commande }) => {
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
      <TableCell>{commande.prix}</TableCell>

      <TableCell>
        {commande.doneDate ? formatDate(commande.doneDate) : ""}
      </TableCell>
      <TableCell>
        <CommandeDetailsModal commande={commande} />
      </TableCell>
    </>
  );
};

export default Row;
