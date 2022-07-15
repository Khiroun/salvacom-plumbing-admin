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
  const [search, setSearch] = useState("");
  useEffect(() => {
    getAll("ouvriers").then((res) => {
      setOuvriers(res);
    });
  }, []);
  const tableData = ouvriers.filter((item) => {
    if (item.lastName.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (item.firstName.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (item.description.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (item.email.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (item.phone.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (item.password.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
  });
  return (
    <Paper>
      <SearchBar search={search} setSearch={setSearch} />
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
            {tableData.map((ouvrier) => {
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
