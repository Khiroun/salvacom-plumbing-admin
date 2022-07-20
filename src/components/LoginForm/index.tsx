import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import useLogin from "./useLogin";
import Loading from "../Loading";
const LoginForm = () => {
  const router = useRouter();
  const { error, loading, handleSubmit } = useLogin();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });
    return unsub;
  }, []);

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
