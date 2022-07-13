import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { FC } from "react";

type Props = {
  children?: JSX.Element | JSX.Element[];
};
const Wrapper: FC<Props> = ({ children }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {children}
      </Table>
    </TableContainer>
  );
};

export default Wrapper;
