import Head from "next/head";
import Drawer from "../../src/components/Drawer";
import Box from "@mui/material/Box";
import CommandesReceptionPageMain from "../../src/components/CommandesReceptionPageMain";
import Navbar from "../../src/components/Navbar";
import useRedirectIfLoggedOut from "../../src/hooks/useRedirectIfLoggedOut";
import { CircularProgress } from "@mui/material";
import { auth } from "../../src/firebase";
const CommandesPage = () => {
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
          <title>Reception</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Drawer />
        <CommandesReceptionPageMain />
      </Box>
    </>
  );
};

export default CommandesPage;
