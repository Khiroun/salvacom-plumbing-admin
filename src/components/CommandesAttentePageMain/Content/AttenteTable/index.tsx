import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import Wrapper from "./Wrapper";
import OuvrierCell from "./OuvrierCell";
import SiteCell from "./SiteCell";
import ServiceCell from "./ServiceCell";

const AttenteTable = () => {
  const [commandes, setCommandes] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "commandes"),
      where("status", "==", "attente")
    );
    getDocs(q).then((querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCommandes(res);
    });
  }, []);

  return (
    <Wrapper>
      <TableHead>
        <TableRow>
          <TableCell>Ouvrier</TableCell>
          <TableCell>Nom</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Site</TableCell>
          <TableCell>Service</TableCell>
          <TableCell>Sous service</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {commandes.map((commande) => {
          return (
            <TableRow key={commande.id}>
              <OuvrierCell ouvrierId={commande.ouvrier} />
              <TableCell>{commande.name}</TableCell>
              <TableCell>{commande.phone}</TableCell>
              <SiteCell siteId={commande.selectedLoc} />
              <ServiceCell siteId={commande.selectedService} />
              <TableCell>{commande.selectedSubService}</TableCell>
              <TableCell>
                <Button>Valider</Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Wrapper>
  );
};

export default AttenteTable;
