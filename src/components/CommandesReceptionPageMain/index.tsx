import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SectionTitle from "../SectionTitle";
import TotalPrice from "../TotalPrice";
import CommandesTable from "./CommandesTable";

const CommandesPageMain = () => {
  return (
    <div>
      <SectionTitle>COMMANDES</SectionTitle>
      <Container>
        <Typography variant="h3" color="GrayText">
          Reception
        </Typography>
        <CommandesTable />
      </Container>
    </div>
  );
};

export default CommandesPageMain;
