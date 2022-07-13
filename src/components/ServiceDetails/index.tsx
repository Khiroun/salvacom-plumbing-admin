import { FC } from "react";
import Container from "@mui/material/Container";
import SectionTitle from "../SectionTitle";

import Content from "./Content";

type Props = {
  serviceId: string;
};
const ServiceDetails: FC<Props> = ({ serviceId }) => {
  return (
    <Container>
      <SectionTitle>SERVICES</SectionTitle>
      <Content serviceId={serviceId} />
    </Container>
  );
};

export default ServiceDetails;
