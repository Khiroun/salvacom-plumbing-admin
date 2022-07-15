import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAll } from "../../../firebase";
import SearchBar from "./SearchBar";
const OuvriersTable = () => {
  const [ouvriers, setOuvriers] = useState([]);
  useEffect(() => {
    getAll("ouvriers").then((res) => {
      setOuvriers(res);
    });
  }, []);
  return (
    <Paper>
      <SearchBar />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Mot de passe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ouvriers.map((ouvrier) => {
              return (
                <TableRow key={ouvrier.id}>
                  <TableCell>{ouvrier.lastName}</TableCell>
                  <TableCell>{ouvrier.firstName}</TableCell>
                  <TableCell>{ouvrier.description}</TableCell>
                  <TableCell>{ouvrier.email}</TableCell>
                  <TableCell>{ouvrier.phone}</TableCell>
                  <TableCell>{ouvrier.address}</TableCell>
                  <TableCell>{ouvrier.password}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OuvriersTable;
