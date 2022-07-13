import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC } from "react";
import DeleteButton from "./DeleteButton";
import Wrapper from "./Wrapper";
import ManageButton from "./ManageButton";

type Props = {
  services: any[];
};
const ServicesTable: FC<Props> = ({ services }) => {
  return (
    <Wrapper>
      <TableHead>
        <TableRow>
          <TableCell>Nom</TableCell>
          <TableCell align="right">Description</TableCell>

          <TableCell align="right">Gérer</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {services &&
          services.map((service) => (
            <TableRow
              key={service.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {service.name}
              </TableCell>
              <TableCell align="right">{service.description}</TableCell>
              <TableCell
                align="right"
                sx={{
                  display: "flex",
                }}
              >
                <DeleteButton id={service.id} />
                <ManageButton id={service.id} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Wrapper>
  );
};
export default ServicesTable;
