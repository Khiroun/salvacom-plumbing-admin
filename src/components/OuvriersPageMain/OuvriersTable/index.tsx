import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import MyTable from "../../MyTable";
import OuvriersRowInner from "./OuvriersRowInner";
const OuvriersTable = () => {
  const [ouvriers, setOuvriers] = useState([]);
 
  useEffect(() => {
    const q = collection(db, "ouvriers");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() });
      });
      setOuvriers(res);
    });
    return unsubscribe;
  }, []);
  const columns = [
    "Nom",
    "Prénom",
    "Email",
    "Mot de passe",
    "Téléphone",
    "Adresse",
    "Description",
    "",
  ];
  const renderRow = (row) => {
    return <OuvriersRowInner ouvrier={row} />;
  };

  return <MyTable columns={columns} data={ouvriers} renderRow={renderRow} />;
};

export default OuvriersTable;
