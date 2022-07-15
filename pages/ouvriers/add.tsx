import Box from "@mui/material/Box";
import Head from "next/head";
import Drawer from "../../src/components/Drawer";
import OuvriersPageMain from "../../src/components/OuvriersPageMain";

const add = () => {
  return (
    <Box gridTemplateColumns="1fr 4fr" display="grid">
      <Head>
        <title>Ajouter un Ouvrier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer />
      <OuvriersPageMain />
    </Box>
  );
};

export default add;
