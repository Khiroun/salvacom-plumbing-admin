import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Title from "./Title";
import ArchiveTable from "./ArchiveTable";

const Content = () => {
  return (
    <Container>
      <Title />
      <ArchiveTable />
      <Box display="flex" justifyContent="space-between">
        <Link href="/commandes/done">Services Faits</Link>
        <Link href="/commandes">Reception</Link>
      </Box>
    </Container>
  );
};

export default Content;
