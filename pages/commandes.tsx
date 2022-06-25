import Head from "next/head";
import Drawer from "../src/components/Drawer";
import Box from "@mui/material/Box";
import CommandesPageMain from "../src/components/CommandesPageMain";
const CommandesPage = () => {
  return (
    <Box gridTemplateColumns="1fr 4fr" display="grid">
      <Head>
        <title>Mes commandes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer />
      <CommandesPageMain />
    </Box>
  );
};

export default CommandesPage;
