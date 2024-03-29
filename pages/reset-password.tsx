import Head from "next/head";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../src/components/Navbar";
import useRedirectIfLoggedOut from "../src/hooks/useRedirectIfLoggedOut";
import {
  auth,
  getDocumentByField,
  signOut,
  updateDocument,
} from "../src/firebase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useRouter } from "next/router";
const ResetPasswordPage = () => {
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const { loading } = useRedirectIfLoggedOut();
  if (loading) {
    return <CircularProgress />;
  }
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      return;
    }
    setEditing(true);
    const cred = EmailAuthProvider.credential(currentUser.email, oldPassword);
    const m = await reauthenticateWithCredential(currentUser, cred).catch(
      (e) => {
        setEditing(false);
        alert("Not de passe erroné");
      }
    );
    if (m) {
      const ouvrier = await getDocumentByField(
        "ouvriers",
        "email",
        currentUser.email
      );
      if (ouvrier) {
        await updateDocument("ouvriers", ouvrier.id, { password: password });
      }
      await updatePassword(currentUser, password);

      setEditing(false);
      alert("Mot de passe modifié");
      router.push("/");
    }
    //await auth.currentUser.updatePassword(password);
  };
  return (
    <>
      <Navbar />
      <Box>
        <Head>
          <title>Modifier le mot de passe</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Modifier le mot de passe
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Ancien mot de passe"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nouveau mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirmer le nouveau mot de passe"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              disabled={
                editing ||
                password.length < 6 ||
                password !== passwordConfirmation
              }
            >
              {editing
                ? "Modification en cours..."
                : "Modifier le mot de passe"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetPasswordPage;
