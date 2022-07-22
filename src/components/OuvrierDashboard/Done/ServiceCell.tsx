import TableCell from "@mui/material/TableCell";
import { FC, useEffect, useState } from "react";
import { getDocument } from "../../../firebase";
type Props = {
  serviceId: string;
};
const ServiceCell: FC<Props> = ({ serviceId }) => {
  const [serviceName, setServiceName] = useState("");
  useEffect(() => {
    getDocument("services", serviceId).then((res) => {
      setServiceName(res.name);
    });
  }, []);
  return <TableCell>{serviceName}</TableCell>;
};

export default ServiceCell;
