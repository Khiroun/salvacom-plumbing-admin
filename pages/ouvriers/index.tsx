import Box from "@mui/material/Box";
import Head from "next/head";
import Drawer from "../../src/components/Drawer";
import OuvriersPageMain from "../../src/components/OuvriersPageMain";
const PageOuvriers = () => {
  return (
    <Box gridTemplateColumns="1fr 4fr" display="grid">
      <Head>
        <title>Mes ouvriers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer />
      <OuvriersPageMain />
    </Box>
  );
};

export default PageOuvriers;
