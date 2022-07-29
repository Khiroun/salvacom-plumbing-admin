import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import AdminPageContainer from "../../src/components/AdminPageContainer";
import Drawer from "../../src/components/Drawer";
import Navbar from "../../src/components/Navbar";
import OuvriersPageMain from "../../src/components/OuvriersPageMain";
import { auth } from "../../src/firebase";
import useRedirectIfLoggedOut from "../../src/hooks/useRedirectIfLoggedOut";
const PageOuvriers = () => {
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
          <title>Mes ouvriers</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AdminPageContainer>
          <Drawer />
          <OuvriersPageMain />
        </AdminPageContainer>
      </Box>
    </>
  );
};

export default PageOuvriers;
