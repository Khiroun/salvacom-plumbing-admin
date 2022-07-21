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
      loading={loading}
    />
  );
};

export default AttenteTable;
