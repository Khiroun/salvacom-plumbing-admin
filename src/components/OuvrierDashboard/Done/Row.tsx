import { TableCell } from "@mui/material";
import { FC } from "react";
import formatDate from "../../../utils/formatDate";
import LocationCell from "./LocationCell";
import ServiceCell from "./ServiceCell";

type Props = {
  commande: {
    [key: string]: string;
  };
};
const Row: FC<Props> = ({ commande }) => {
  return (
    <>
      <TableCell>{commande.name}</TableCell>
      <TableCell>{commande.phone}</TableCell>
      <TableCell>{commande.address}</TableCell>
      <LocationCell siteId={commande.selectedLoc} />
      <ServiceCell serviceId={commande.selectedService} />

      <TableCell>
        {commande.doneDate ? formatDate(commande.doneDate) : ""}
      </TableCell>
    </>
  );
};

export default Row;
