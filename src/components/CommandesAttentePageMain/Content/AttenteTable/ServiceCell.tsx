import TableCell from "@mui/material/TableCell";
import { FC, useEffect, useState } from "react";
import { getDocument } from "../../../../firebase";
type Props = {
  siteId: string;
};
const ServiceCell: FC<Props> = ({ siteId }) => {
  const [serviceName, setServiceName] = useState("");
  useEffect(() => {
    getDocument("services", siteId).then((res) => {
      setServiceName(res.name);
    });
  }, []);
  return <TableCell>{serviceName}</TableCell>;
};

export default ServiceCell;
