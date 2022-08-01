import Head from "next/head";
import Drawer from "../../src/components/Drawer";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../../src/components/Navbar";
import useRedirectIfLoggedOut from "../../src/hooks/useRedirectIfLoggedOut";
import { auth } from "../../src/firebase";
import AdminPageContainer from "../../src/components/AdminPageContainer";
import ServicesFaitsPageMain from "../../src/components/ServicesFaitsPageMain";
const Done = () => {
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
          <title>Services faits</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AdminPageContainer>
          <Drawer />
          <ServicesFaitsPageMain />
        </AdminPageContainer>
      </Box>
    </>
  );
};

export default Done;
