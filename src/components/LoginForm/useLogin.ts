import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "../../firebase";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (typeof email !== "string") return;
    if (typeof password !== "string") return;
    await signInWithEmailAndPassword(email, password).catch((e) => {
      setError(e.message.replace("Firebase: Error", ""));
    });

    setLoading(false);
  };
  return { loading, error, handleSubmit };
};
export default useLogin;
