import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { FC } from "react";
type Props = {
  children: JSX.Element[];
};
const Wrapper: FC<Props> = ({ children }) => {
  return (
    <TableContainer>
      <Table>{children}</Table>
    </TableContainer>
  );
};

export default Wrapper;
