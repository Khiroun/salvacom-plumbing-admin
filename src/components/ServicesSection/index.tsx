import Container from "@mui/material/Container";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import AddServiceButton from "./AddServiceButton";
import SectionTitle from "../SectionTitle";
import ServicesTable from "./ServicesTable";
const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const q = collection(db, "services");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() });
      });
      setServices(res);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <Container>
      <SectionTitle>SERVICES</SectionTitle>
      <AddServiceButton />
      <ServicesTable services={services} loading={loading} />
    </Container>
  );
};

export default ServicesSection;
