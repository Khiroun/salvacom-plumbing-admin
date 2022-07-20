import Box from "@mui/material/Box";
import { collection, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Drawer from "../src/components/Drawer";
import Loading from "../src/components/Loading";
import Navbar from "../src/components/Navbar";
import OuvrierDashboard from "../src/components/OuvrierDashboard";
import ServicesSection from "../src/components/ServicesSection";
import { auth, db } from "../src/firebase";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");
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
  useEffect(() => {
    const userEmail = auth.currentUser?.email;
    console.log({ userEmail });
    if (userEmail) {
      const q = query(
        collection(db, "ouvriers"),
        where("email", "==", userEmail)
      );
      getDocs(q).then((docs) => {
        if (docs.empty) {
          setUserType("admin");
        } else {
          setUserType("ouvrier");
        }
      });
    }
  }, [auth.currentUser]);
  if (loading) return <Loading />;
  if (!auth.currentUser) return null;
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {userType === "admin" && (
        <>
          <Navbar />
          <Box gridTemplateColumns="1fr 4fr" display="grid">
            <Drawer />
            <ServicesSection />
          </Box>
        </>
      )}
      {userType === "ouvrier" && <OuvrierDashboard />}
    </>
  );
}
