import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import MyTable from "../../MyTable";
import OuvriersRowInner from "./OuvriersRowInner";
const OuvriersTable = () => {
  const [ouvriers, setOuvriers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const q = collection(db, "ouvriers");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() });
      });
      setOuvriers(res);
      setLoading(false);
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

  return (
    <MyTable
      columns={columns}
      data={ouvriers}
      renderRow={renderRow}
      loading={loading}
    />
  );
};

export default OuvriersTable;
