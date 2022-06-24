import Box from "@mui/material/Box";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Drawer from "../src/components/Drawer";
import Loading from "../src/components/Loading";
import ServicesSection from "../src/components/ServicesSection";
import { auth } from "../src/firebase";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("login");
      }
      setLoading(false);
    });
    return unsub;
  }, []);
  if (loading) return <Loading />;
  if (!auth.currentUser) return null;
  return (
    <Box gridTemplateColumns="1fr 4fr" display="grid">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer />
      <ServicesSection />
    </Box>
  );
}
