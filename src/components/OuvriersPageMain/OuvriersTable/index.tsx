import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, getAll } from "../../../firebase";
import OuvrierRow from "./OuvrierRow";
import SearchBar from "./SearchBar";
const OuvriersTable = () => {
  const [ouvriers, setOuvriers] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const q = collection(db, "ouvriers");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() });
      });
      setOuvriers(res);
    });
    return unsubscribe;
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((ouvrier) => {
              return <OuvrierRow ouvrier={ouvrier} key={ouvrier.id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OuvriersTable;
