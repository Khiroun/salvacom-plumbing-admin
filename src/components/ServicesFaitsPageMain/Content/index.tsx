import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Title from "./Title";
import ServicesFaitsTable from "./ServicesFaitsTable";

const Content = () => {
  return (
    <Container>
      <Title />
      <ServicesFaitsTable />
      <Box display="flex" justifyContent="space-between">
        <Link href="/commandes/confirmed">Commandes confirmées</Link>
        <Link href="/commandes">Reception</Link>
      </Box>
    </Container>
  );
};

export default Content;
