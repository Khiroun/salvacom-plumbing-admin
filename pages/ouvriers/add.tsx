import Box from "@mui/material/Box";
import Head from "next/head";
import AddOuvrierPageMain from "../../src/components/AddOuvrierPageMain";
import Drawer from "../../src/components/Drawer";

const add = () => {
  return (
    <Box gridTemplateColumns="1fr 4fr" display="grid">
      <Head>
        <title>Ajouter un Ouvrier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer />
      <AddOuvrierPageMain />
    </Box>
  );
};

export default add;
