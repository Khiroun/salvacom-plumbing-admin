import CommandeTableRow from "./CommandeTableRow";
import TableBody from "@mui/material/TableBody";
import { useEffect, useState } from "react";
import { db, getAll } from "../../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Body = () => {
  const [commandes, setCommandes] = useState([]);
  const [serviceNames, setServiceNames] = useState({});
  const [sitesNames, setSitesNames] = useState({});
  useEffect(() => {
    const q = query(
      collection(db, "commandes"),
      where("status", "==", "reception")
    );
    getDocs(q).then((docs) => {
      const res = [];
      docs.forEach((doc) => {
        res.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCommandes(res);
    });
  }, []);
  useEffect(() => {
    getAll("services").then((data) => {
      const res = {};
      data.forEach((service) => {
        res[service.id] = service.name;
      });
      setServiceNames(res);
    });
  }, []);
  useEffect(() => {
    getAll("sites").then((data) => {
      const res = {};
      data.forEach((site) => {
        res[site.id] = site.siteName;
      });
      setSitesNames(res);
    });
  }, []);
  console.log({ commandes });
  return (
    <TableBody>
      {commandes.map((commande) => {
        const arr = commande.timestamp && commande.timestamp.split(" ");
        const month = arr[1];
        const day = arr[2];
        const year = arr[3];
        const time = arr[4];
        const timeArr = time.split(":");
        const hour = timeArr[0];
        const minut = timeArr[1];
        const displayTime = `${day}/${month}/${year} a ${hour}:${minut}`;
        return (
          <CommandeTableRow
            key={commande.id}
            id={commande.id}
            name={commande.name}
            address={commande.address}
            phone={commande.phone}
            service={serviceNames[commande.selectedService]}
            subService={commande.selectedSubService}
            site={sitesNames[commande.selectedLoc]}
            displayTime={displayTime}
          />
        );
      })}
    </TableBody>
  );
};

export default Body;
