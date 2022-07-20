import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import Wrapper from "./Wrapper";
import CommandeRow from "./CommandeRow";

const AttenteTable = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(
      collection(db, "commandes"),
      where("status", "==", "attente")
    );
    const unsub = onSnapshot(q, (res) => {
      const commandes = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCommandes(commandes);
      setLoading(false);
    });
    return unsub;
  }, []);
  if (loading) return <CircularProgress />;
  if (commandes.length === 0)
    return (
      <Paper
        sx={{
          width: "50%",
          margin: "auto",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h3" color="GrayText" textAlign="center">
          Aucune commande en attente
        </Typography>
      </Paper>
    );
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
          return <CommandeRow key={commande.id} commande={commande} />;
        })}
      </TableBody>
    </Wrapper>
  );
};

export default AttenteTable;
