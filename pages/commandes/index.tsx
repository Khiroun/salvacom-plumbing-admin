import Head from "next/head";
import Drawer from "../../src/components/Drawer";
import Box from "@mui/material/Box";
import CommandesReceptionPageMain from "../../src/components/CommandesReceptionPageMain";
const CommandesPage = () => {
  return (
    <Box gridTemplateColumns="1fr 4fr" display="grid">
      <Head>
        <title>Reception</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer />
      <CommandesReceptionPageMain />
    </Box>
  );
};

export default CommandesPage;
