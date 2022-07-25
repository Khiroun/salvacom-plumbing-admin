import { FC } from "react";
import TableCell from "@mui/material/TableCell";
import ActionCell from "./ActionCell";

type Props = {
  ouvrier: {
    [x: string]: string;
  };
};
const OuvriersRowInner: FC<Props> = ({ ouvrier }) => {
  return (
    <>
      <TableCell>{ouvrier.lastName}</TableCell>
      <TableCell>{ouvrier.firstName}</TableCell>
      <TableCell>{ouvrier.email}</TableCell>
      <TableCell>{ouvrier.password}</TableCell>
      <TableCell>{ouvrier.phone}</TableCell>
      <TableCell>{ouvrier.address}</TableCell>
      <TableCell>{ouvrier.description}</TableCell>
      <ActionCell ouvrierId={ouvrier.id} />
    </>
  );
};

export default OuvriersRowInner;
