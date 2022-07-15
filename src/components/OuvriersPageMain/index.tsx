import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SectionTitle from "../SectionTitle";
import OuvriersTable from "./OuvriersTable";

const OuvriersPageMain = () => {
  return (
    <div>
      <SectionTitle>Ouvriers</SectionTitle>
      <Container>
        <Typography variant="h3" color="GrayText">
          Mes ouvriers
        </Typography>
        <OuvriersTable />
      </Container>
    </div>
  );
};

export default OuvriersPageMain;
