import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useRedirectIfLoggedOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      }
      setLoading(false);
    });
    return unsub;
  }, []);
  return { loading };
};
export default useRedirectIfLoggedOut;
