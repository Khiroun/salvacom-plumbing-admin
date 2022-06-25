import { FC } from "react";
import TableCell from "@mui/material/TableCell";

type Props = {
  siteId: string;
};
const SiteTableCell: FC<Props> = ({ siteId }) => {
  return <TableCell>{siteId}</TableCell>;
};

export default SiteTableCell;
