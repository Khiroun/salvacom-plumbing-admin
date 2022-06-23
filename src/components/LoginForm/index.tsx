import { FormEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "../../firebase";
import Loading from "../Loading";
import { useRouter } from "next/router";
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });
    return unsub;
  }, []);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (typeof email !== "string") return;
    if (typeof password !== "string") return;
    signInWithEmailAndPassword(email, password)
      .catch((e) => {
        setError(e.message.replace("Firebase: Error", ""));
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (loading) return <Loading />;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mot de passe"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        S'authentifier
      </Button>
    </Box>
  );
};

export default LoginForm;
