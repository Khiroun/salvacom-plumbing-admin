import { FC, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ActionCell from "./ActionCell";
type Props = {
  ouvrier: {
    [x: string]: string;
  };
};
const OuvrierRow: FC<Props> = ({ ouvrier }) => {
  return (
    <TableRow>
      <TableCell>{ouvrier.lastName}</TableCell>
      <TableCell>{ouvrier.firstName}</TableCell>
      <TableCell>{ouvrier.description}</TableCell>
      <TableCell>{ouvrier.email}</TableCell>
      <TableCell>{ouvrier.phone}</TableCell>
      <TableCell>{ouvrier.address}</TableCell>
      <TableCell>{ouvrier.password}</TableCell>
      <ActionCell ouvrierId={ouvrier.id} />
    </TableRow>
  );
};

export default OuvrierRow;
