import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SectionTitle from "../SectionTitle";
import CommandesTable from "./CommandesTable";

const CommandesPageMain = () => {
  return (
    <div>
      <SectionTitle>COMMANDES</SectionTitle>
      <Container>
        <Typography variant="h3" color="GrayText">
          Mes commandes
        </Typography>
        <CommandesTable />
      </Container>
    </div>
  );
};

export default CommandesPageMain;
