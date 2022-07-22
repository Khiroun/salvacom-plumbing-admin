import { FC, useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import { getDocument } from "../../../firebase";
type Props = {
  siteId: string;
};
const LocationCell: FC<Props> = ({ siteId }) => {
  const [siteName, setSiteName] = useState("");
  useEffect(() => {
    if (!siteId) return;
    getDocument("sites", siteId).then((site) => {
      setSiteName(site.siteName);
    });
  }, [siteId]);
  return <TableCell>{siteName}</TableCell>;
};

export default LocationCell;
