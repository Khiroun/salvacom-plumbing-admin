import { Container } from "@mui/material";
import { FC } from "react";
import MyTable from "../../MyTable";

import SectionTitle from "../../SectionTitle";
import Row from "./Row";

type Props = {
  commandes: any[];
  goToConfirmedPage: () => void;
};
const Attente: FC<Props> = ({ commandes, goToConfirmedPage }) => {
  const columns = [
    "Nom",
    "Phone",
    "Adresse",
    "Site",
    "Prix min-max",
    "Prix",
    "Actions",
  ];
  return (
    <div>
      <SectionTitle>Commandes en attente</SectionTitle>
      <Container sx={{ marginTop: "2rem" }}>
        <MyTable
          columns={columns}
          data={commandes}
          renderRow={(commande) => {
            return (
              <Row commande={commande} goToConfirmedPage={goToConfirmedPage} />
            );
          }}
        />
      </Container>
    </div>
  );
};

export default Attente;
