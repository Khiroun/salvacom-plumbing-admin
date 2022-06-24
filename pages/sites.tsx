import Box from "@mui/material/Box";
import Head from "next/head";
import Drawer from "../src/components/Drawer";
import SitesPageMain from "../src/components/SitesPageMain";
const SitesPage = () => {
  return (
    <Box gridTemplateColumns="1fr 4fr" display="grid">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer />
      <SitesPageMain />
    </Box>
  );
};

export default SitesPage;
