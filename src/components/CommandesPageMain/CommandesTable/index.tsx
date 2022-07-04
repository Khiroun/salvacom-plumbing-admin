import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useEffect, useState } from "react";
import { getAll } from "../../../firebase";

const CommandesTable = () => {
  const [commandes, setCommandes] = useState([]);
  const [serviceNames, setServiceNames] = useState({});
  const [sitesNames, setSitesNames] = useState({});
  useEffect(() => {
    getAll("commandes").then((data) => {
      setCommandes(data);
    });
  }, []);
  useEffect(() => {
    getAll("services").then((data) => {
      const res = {};
      data.forEach((service) => {
        res[service.id] = service.name;
      });
      setServiceNames(res);
    });
  }, []);
  useEffect(() => {
    getAll("sites").then((data) => {
      const res = {};
      data.forEach((site) => {
        res[site.id] = site.siteName;
      });
      setSitesNames(res);
    });
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom Et Prénom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Site</TableCell>
            <TableCell>Envoyé le</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commandes.map((commande) => {
            const arr = commande.timestamp && commande.timestamp.split(" ");
            const month = arr[1];
            const day = arr[2];
            const year = arr[3];
            const time = arr[4];
            const timeArr = time.split(":");
            const hour = timeArr[0];
            const minut = timeArr[1];
            const displayTime = `${day}/${month}/${year} a ${hour}:${minut}`;
            return (
              <TableRow key={commande.id}>
                <TableCell>{commande.name}</TableCell>
                <TableCell>{commande.email}</TableCell>
                <TableCell>{commande.phone}</TableCell>
                <TableCell>{serviceNames[commande.selectedService]}</TableCell>
                <TableCell>{sitesNames[commande.selectedLoc]}</TableCell>
                <TableCell>{displayTime}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommandesTable;
