import { Container } from "@mui/material";
import { FC } from "react";
import MyTable from "../../MyTable";

import SectionTitle from "../../SectionTitle";
import Row from "./Row";

type Props = {
  commandes: any[];
};
const Done: FC<Props> = ({ commandes }) => {
  const columns = ["Nom", "Phone", "Adresse", "Site", "Prix", "Fait le"];
  return (
    <div>
      <SectionTitle>Services Faits</SectionTitle>
      <Container sx={{ marginTop: "2rem" }}>
        <MyTable
          columns={columns}
          data={commandes}
          renderRow={(commande) => {
            return <Row commande={commande} />;
          }}
        />
      </Container>
    </div>
  );
};

export default Done;
