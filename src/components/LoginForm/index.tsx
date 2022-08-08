import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import useLogin from "./useLogin";
import Loading from "../Loading";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
const LoginForm = () => {
  const router = useRouter();
  const { error, loading, handleSubmit } = useLogin();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
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
      <span
        style={{
          position: "relative",
          display: "block",
          minWidth: "50vw",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type={passwordVisibility ? "text" : "password"}
          id="password"
          autoComplete="current-password"
        />
        <span
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {passwordVisibility ? (
            <AiFillEye onClick={() => setPasswordVisibility(false)} size={20} />
          ) : (
            <AiFillEyeInvisible
              onClick={() => setPasswordVisibility(true)}
              size={20}
            />
          )}
        </span>
      </span>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        S'authentifier
      </Button>
    </Box>
  );
};

export default LoginForm;
