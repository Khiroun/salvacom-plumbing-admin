import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import SectionTitle from "../SectionTitle";

const CommandesAttentePageMain = () => {
  const [commandes, setCommandes] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "commandes"),
      where("status", "==", "attente")
    );
    getDocs(q).then((querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        res.push({
          id: doc.id,
          ...doc.data,
        });
      });
      setCommandes(res);
    });
  }, []);
  return (
    <div>
      <SectionTitle>COMMANDES</SectionTitle>
      <Container>
        <Typography variant="h3" color="GrayText">
          En attente de confirmation
        </Typography>
        <TableContainer>
          <Table>
            <TableHead></TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default CommandesAttentePageMain;
