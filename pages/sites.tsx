import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import Drawer from "../src/components/Drawer";
import Navbar from "../src/components/Navbar";
import SitesPageMain from "../src/components/SitesPageMain";
import { auth } from "../src/firebase";
import useRedirectIfLoggedOut from "../src/hooks/useRedirectIfLoggedOut";
const SitesPage = () => {
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
          <title>Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Drawer />
        <SitesPageMain />
      </Box>
    </>
  );
};

export default SitesPage;
