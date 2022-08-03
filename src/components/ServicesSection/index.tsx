import Container from "@mui/material/Container";
import { useGetAllSnapshot } from "../../firebase";
import AddServiceButton from "./AddServiceButton";
import SectionTitle from "../SectionTitle";
import ServicesTable from "./ServicesTable";
const ServicesSection = () => {
  const { data, loading } = useGetAllSnapshot("services");

  return (
    <Container>
      <SectionTitle>SERVICES</SectionTitle>
      <AddServiceButton />
      <ServicesTable services={data} loading={loading} />
    </Container>
  );
};

export default ServicesSection;
