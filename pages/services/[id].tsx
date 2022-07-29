import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Head from "next/head";
import Drawer from "../../src/components/Drawer";
import ServiceDetails from "../../src/components/ServiceDetails";
import ServiceSites from "../../src/components/ServiceSites";
import SubServices from "../../src/components/SubServices";
import Navbar from "../../src/components/Navbar";
import useRedirectIfLoggedOut from "../../src/hooks/useRedirectIfLoggedOut";
import { CircularProgress } from "@mui/material";
import { auth } from "../../src/firebase";
import AdminPageContainer from "../../src/components/AdminPageContainer";

const ServiceDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading } = useRedirectIfLoggedOut();
  if (loading) {
    return <CircularProgress />;
  }
  if (!auth.currentUser) return null;

  if (typeof id !== "string") return null;
  return (
    <>
      <Navbar />
      <Box gridTemplateColumns="1fr 4fr" display="grid">
        <Head>
          <title>Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AdminPageContainer>
          <Drawer />
          <div>
            <ServiceDetails serviceId={id} />
            <ServiceSites serviceId={id} />
            <SubServices serviceId={id} />
          </div>
        </AdminPageContainer>
      </Box>
    </>
  );
};

export default ServiceDetailsPage;
