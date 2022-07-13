import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Head from "next/head";
import Drawer from "../../src/components/Drawer";
import ServiceDetails from "../../src/components/ServiceDetails";
import ServiceSites from "../../src/components/ServiceSites";

const ServiceDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== "string") return null;
  return (
    <Box gridTemplateColumns="1fr 4fr" display="grid">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer />
      <div>
        <ServiceDetails serviceId={id} />
        <ServiceSites serviceId={id} />
      </div>
    </Box>
  );
};

export default ServiceDetailsPage;
