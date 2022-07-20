import TableCell from "@mui/material/TableCell";
import { FC, useEffect, useState } from "react";
import { getDocument } from "../../../../../firebase";
type Props = {
  ouvrierId: string;
};
const OuvrierCell: FC<Props> = ({ ouvrierId }) => {
  const [ouvrierName, setOuvrierName] = useState("");
  useEffect(() => {
    getDocument("ouvriers", ouvrierId).then((res) => {
      setOuvrierName(res.lastName + " " + res.firstName);
    });
  }, []);
  return <TableCell>{ouvrierName}</TableCell>;
};

export default OuvrierCell;
