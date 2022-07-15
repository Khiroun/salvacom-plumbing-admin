import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useEffect, useState } from "react";
import { getAll } from "../../../firebase";
import { Button } from "@mui/material";

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
            <TableCell>Adresse</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Sous service</TableCell>
            <TableCell>Site</TableCell>
            <TableCell>Envoyé le</TableCell>
            <TableCell>Actions</TableCell>
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
                <TableCell>{commande.address}</TableCell>
                <TableCell>{commande.phone}</TableCell>
                <TableCell>{serviceNames[commande.selectedService]}</TableCell>
                <TableCell>{commande.selectedSubService}</TableCell>
                <TableCell>{sitesNames[commande.selectedLoc]}</TableCell>
                <TableCell>{displayTime}</TableCell>
                <TableCell>
                  <Button variant="contained">Valider</Button>
                  <Button variant="contained" color="error">
                    Annuler
                  </Button>
                  <Button variant="contained" color="warning">
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommandesTable;
