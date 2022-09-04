import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Title from "./Title";
import AttenteTable from "./AttenteTable";

const Content = () => {
  return (
    <Container>
      <Title />
      <AttenteTable />
      <Box display="flex" justifyContent="space-between">
        <Link href="/commandes/attente">Attente</Link>
        <Link href="/commandes/done">Services Faits</Link>
      </Box>
    </Container>
  );
};

export default Content;
