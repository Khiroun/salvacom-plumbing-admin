import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { AiFillDelete } from "react-icons/ai";
import { FC } from "react";
import DeleteButton from "./DeleteButton";

type Props = {
  services: any[];
};
const ServicesTable: FC<Props> = ({ services }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Prix min</TableCell>
            <TableCell align="right">Prix max</TableCell>
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
                <TableCell align="right">{service.price[0]}</TableCell>
                <TableCell align="right">{service.price[1]}</TableCell>
                <TableCell align="right">
                  <DeleteButton id={service.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ServicesTable;
