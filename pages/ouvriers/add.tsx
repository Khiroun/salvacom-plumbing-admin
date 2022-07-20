import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import AddOuvrierPageMain from "../../src/components/AddOuvrierPageMain";
import Drawer from "../../src/components/Drawer";
import Navbar from "../../src/components/Navbar";
import { auth } from "../../src/firebase";
import useRedirectIfLoggedOut from "../../src/hooks/useRedirectIfLoggedOut";

const add = () => {
  const { loading } = useRedirectIfLoggedOut();
  if (loading) {
    return <CircularProgress />;
  }
  if (!auth.currentUser) return null;

  return (
    <>
      <Navbar />
      <Box gridTemplateColumns="1fr 4fr" display="grid">
        <Head>
          <title>Ajouter un Ouvrier</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Drawer />
        <AddOuvrierPageMain />
      </Box>
    </>
  );
};

export default add;
