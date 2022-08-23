import { Container } from "@mui/material";
import { FC } from "react";
import MyTable from "../../MyTable";

import SectionTitle from "../../SectionTitle";
import Row from "./Row";

type Props = {
  commandes: any[];
  goToDonePage: () => void;
};
const Confirmed: FC<Props> = ({ commandes, goToDonePage }) => {
  const columns = ["Nom", "Phone", "Adresse", "Site", "Prix", ""];
  return (
    <div>
      <SectionTitle>Commandes Confirmées</SectionTitle>
      <Container sx={{ marginTop: "2rem" }}>
        <MyTable
          columns={columns}
          data={commandes}
          renderRow={(commande) => {
            return <Row commande={commande} goToDonePage={goToDonePage} />;
          }}
        />
      </Container>
    </div>
  );
};

export default Confirmed;
