import Head from "next/head";
import Drawer from "../../src/components/Drawer";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CommandesConfirmedPageMain from "../../src/components/CommandesConfirmedPageMain";
import Navbar from "../../src/components/Navbar";
import useRedirectIfLoggedOut from "../../src/hooks/useRedirectIfLoggedOut";
import { auth } from "../../src/firebase";
import AdminPageContainer from "../../src/components/AdminPageContainer";
const Confirmed = () => {
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
          <title>Commandes Confirmées</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AdminPageContainer>
          <Drawer />
          <CommandesConfirmedPageMain />
        </AdminPageContainer>
      </Box>
    </>
  );
};

export default Confirmed;
