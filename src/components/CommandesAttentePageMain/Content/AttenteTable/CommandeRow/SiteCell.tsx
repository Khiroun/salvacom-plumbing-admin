import TableCell from "@mui/material/TableCell";
import { FC, useEffect, useState } from "react";
import { getDocument } from "../../../../../firebase";
type Props = {
  siteId: string;
};
const SiteCell: FC<Props> = ({ siteId }) => {
  const [siteName, setSiteName] = useState("");
  useEffect(() => {
    if (siteId) {
      getDocument("sites", siteId).then((res) => {
        setSiteName(res.siteName);
      });
    }
  }, [siteId]);
  return <TableCell>{siteName}</TableCell>;
};

export default SiteCell;
