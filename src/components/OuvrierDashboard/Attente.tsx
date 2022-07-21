import { Container, TableCell } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { db } from "../../firebase";
import MyTable from "../MyTable";

import SectionTitle from "../SectionTitle";

type Props = {
  ouvrier: {
    [x: string]: string;
  };
};
const Attente: FC<Props> = ({ ouvrier }) => {
  const [commandes, setCommandes] = useState([]);
  useEffect(() => {
    const ouvrierId = ouvrier.id;
    if (ouvrierId) {
      const q = query(
        collection(db, "commandes"),
        where("status", "==", "attente"),
        where("ouvrier", "==", "2fiFWkat6N0KSOvfRcUF")
      );
      onSnapshot(q, (querySnapshot) => {
        const res = [];
        querySnapshot.forEach((doc) => {
          res.push({ id: doc.id, ...doc.data() });
        });
        setCommandes(res);
      });
    }
  }, [ouvrier]);
  const columns = ["Nom", "Phone", "Adresse", "Site", "Service", ""];
  return (
    <div>
      <SectionTitle>Commandes en attente</SectionTitle>
      <Container sx={{ marginTop: "2rem" }}>
        <MyTable
          columns={columns}
          data={commandes}
          renderRow={(commande) => {
            return (
              <>
                <TableCell>{commande.nom}</TableCell>
                <TableCell>{commande.telephone}</TableCell>
                <TableCell>{commande.adresse}</TableCell>
                <TableCell>{commande.site}</TableCell>
                <TableCell>{commande.service}</TableCell>
                <TableCell></TableCell>
              </>
            );
          }}
        />
      </Container>
    </div>
  );
};

export default Attente;
