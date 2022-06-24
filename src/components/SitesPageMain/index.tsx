import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";

import SectionTitle from "../SectionTitle";
import { useState } from "react";
const MySites = dynamic(
  () => {
    return import("./MySites");
  },
  { ssr: false }
);
const AddSiteButton = dynamic(
  () => {
    return import("./AddSiteButton");
  },
  { ssr: false }
);
const SitesPageMain = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <SectionTitle>SITES</SectionTitle>
      <Container>
        <Typography variant="h3" color="GrayText">
          Mes sites
        </Typography>
        {!open && <MySites />}
        <AddSiteButton
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </Container>
    </div>
  );
};

export default SitesPageMain;
