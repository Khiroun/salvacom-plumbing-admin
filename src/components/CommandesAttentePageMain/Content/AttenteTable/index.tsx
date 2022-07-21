import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import CommandeRow from "./CommandeRow";
import MyTable from "../../../MyTable";

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
  const columns = [
    "Ouvrier",
    "Nom",
    "Phone",
    "Site",
    "Service",
    "Sous service",
    "",
  ];
  return (
    <MyTable
      columns={columns}
      data={commandes}
      renderRow={(commande) => <CommandeRow commande={commande} />}
    />
  );
};

export default AttenteTable;
