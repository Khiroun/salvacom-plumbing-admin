import Box from "@mui/material/Box";
import { collection, getDocs, query, where } from "firebase/firestore";
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

  useEffect(() => {
    const userEmail = auth.currentUser?.email;
    console.log({ userEmail });
    if (userEmail) {
      const q = query(
        collection(db, "ouvriers"),
        where("email", "==", userEmail)
      );
      getDocs(q).then((docs) => {
        if (!docs.empty) {
          setOuvrier(docs.docs[0].data());
        }
      });
    }
  }, [auth.currentUser]);
  const ouvrierName = ouvrier.firstName + " " + ouvrier.lastName;
  return (
    <>
      <Navbar />
      <Box gridTemplateColumns="1fr 4fr" display="grid">
        <Drawer title={ouvrierName} setCurrentTab={setCurrentTab} />
        {currentTab === "attente" && <Attente />}
        {currentTab === "confirmed" && <Confirmed />}
        {currentTab === "done" && <Done />}
      </Box>
    </>
  );
};

export default OuvrierDashboard;
