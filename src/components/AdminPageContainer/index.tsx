import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { auth, getDocumentByField } from "../../firebase";

type Props = {
  children: JSX.Element | JSX.Element[];
};
const AdminPageContainer: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("ouvrier");
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) return;
      const userEmail = user.email;
      if (!userEmail) return;
      getDocumentByField("ouvriers", "email", userEmail).then((doc) => {
        if (doc) {
          setUserType("ouvrier");
          router.push("/");
        } else {
          setUserType("admin");
        }
        setLoading(false);
      });
    });
    return () => {
      unsub();
    };
  }, []);
  if (loading) return <CircularProgress />;
  if (userType === "ouvrier") return <></>;
  return <>{children}</>;
};

export default AdminPageContainer;
