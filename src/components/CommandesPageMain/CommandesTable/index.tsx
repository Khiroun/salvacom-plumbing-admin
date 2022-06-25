import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useEffect, useState } from "react";
import { getAll } from "../../../firebase";

import SiteTableCell from "./SiteTableCell";

const getAddress = async (
  latitude: number | string,
  longitude: number | string
) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a5fe97e320mshbe04253044f8b5cp15279ejsne4358a1be896",
      "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };

  const response = await fetch(
    `https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${latitude}&lon=${longitude}&accept-language=en&polygon_threshold=0.0`,
    options
  );
  const jsonResponse = await response.json();
  const display_name = jsonResponse?.display_name;
  if (display_name) return display_name;
  return "";
};

const getAddress2 = async (
  latitude: number | string,
  longitude: number | string
) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a5fe97e320mshbe04253044f8b5cp15279ejsne4358a1be896",
      "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
    },
  };

  const response = await fetch(
    `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${latitude}%2C-${longitude}&language=fr`,
    options
  );
  const jsonResponse = await response.json();
  const address = jsonResponse?.results && jsonResponse?.results[0]?.address;
  return address;
};

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
    getAll("sites").then(async (data) => {
      for (let i = 0; i < data.length; i++) {
        const site = data[i];
        if (!sitesNames[site.id]) {
          let address = await getAddress(site.latitude, site.longitude);
          if (!address) {
            address = await getAddress2(site.latitude, site.longitude);
          }
          setSitesNames((prev) => {
            return {
              ...prev,
              [site.id]: address,
            };
          });
        }
      }
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
            return (
              <TableRow key={commande.id}>
                <TableCell>{commande.name}</TableCell>
                <TableCell>{commande.email}</TableCell>
                <TableCell>{commande.phone}</TableCell>
                <TableCell>{serviceNames[commande.selectedService]}</TableCell>
                <SiteTableCell siteId={sitesNames[commande.selectedLoc]} />
                <TableCell>{commande.timestamp}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommandesTable;
