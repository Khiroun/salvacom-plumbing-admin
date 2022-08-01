import Box from "@mui/material/Box";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import Navbar from "../Navbar";
import Attente from "./Attente";
import Confirmed from "./Confirmed";
import Done from "./Done";
import Drawer from "./Drawer";
type Ouvrier = {
  [x: string]: string;
};
const OuvrierDashboard = () => {
  const [ouvrier, setOuvrier] = useState<Ouvrier>({
    firstName: "",
    lastName: "",
  });
  const [currentTab, setCurrentTab] = useState("attente");
  const [commandes, setCommandes] = useState([]);
  useEffect(() => {
    const userEmail = auth.currentUser?.email;
    if (userEmail) {
      const q = query(
        collection(db, "ouvriers"),
        where("email", "==", userEmail)
      );
      getDocs(q).then((docs) => {
        if (!docs.empty) {
          setOuvrier({
            id: docs.docs[0].id,
            ...docs.docs[0].data(),
          });
        }
      });
    }
  }, [auth.currentUser]);
  useEffect(() => {
    const ouvrierId = ouvrier.id;
    if (ouvrierId) {
      const q = query(
        collection(db, "commandes"),
        where("ouvrier", "==", ouvrierId)
      );
      onSnapshot(q, (snapshot) => {
        const commandes = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setCommandes(commandes);
      });
    }
  }, [ouvrier]);
  const ouvrierName = ouvrier.firstName + " " + ouvrier.lastName;
  const attenteCommandes = commandes.filter((c) => c.status === "attente");
  const confirmedCommandes = commandes.filter((c) => c.status === "confirmed");
  const doneCommandes = commandes.filter((c) => c.status === "done");
  const goToConfirmedPage = () => {
    setCurrentTab("confirmed");
  };
  const goToDonePage = () => {
    setCurrentTab("done");
  };
  return (
    <>
      <Navbar />
      <Box gridTemplateColumns="1fr 4fr" display="grid">
        <Drawer
          title={ouvrierName}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
        {currentTab === "attente" && (
          <Attente
            commandes={attenteCommandes}
            goToConfirmedPage={goToConfirmedPage}
          />
        )}
        {currentTab === "confirmed" && (
          <Confirmed
            commandes={confirmedCommandes}
            goToDonePage={goToDonePage}
          />
        )}
        {currentTab === "done" && <Done commandes={doneCommandes} />}
      </Box>
    </>
  );
};

export default OuvrierDashboard;
