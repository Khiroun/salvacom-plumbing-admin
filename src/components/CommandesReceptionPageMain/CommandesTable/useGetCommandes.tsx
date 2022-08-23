import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, getAll } from "../../../firebase";

const useGetCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "commandes"),
      where("status", "==", "reception")
    );
    onSnapshot(q, async (snapshot) => {
      let res: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const sitesDocs = await getAll("sites");
      const sitesNames = {};
      sitesDocs.forEach((site) => {
        sitesNames[site.id] = site.siteName;
      });

      res = res.map((commande) => {
        return {
          ...commande,
          siteName: sitesNames[commande.selectedLoc],
        };
      });
      setCommandes(res);
      setLoading(false);
    });
  }, []);
  return { commandes, loading };
};
export default useGetCommandes;
