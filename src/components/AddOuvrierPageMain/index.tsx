import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SectionTitle from "../SectionTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { addDocument } from "../../firebase";
import { useRouter } from "next/router";
const AddOuvrierPageMain = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  const onChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submit = async () => {
    console.log(data);
    await addDocument("ouvriers", data);
    router.push("/ouvriers");
  };
  return (
    <div>
      <SectionTitle>Ajouter un ouvrier</SectionTitle>
      <Container
        style={{
          marginTop: "1em",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Informations générales
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Prénom"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Nom"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address"
              label="Adresse"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="email"
              label="Email"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              type="email"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="password"
              label="Mot de passe"
              fullWidth
              variant="standard"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="phone"
              label="Téléphone"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              type="tel"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="description"
              label="Description"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="large" onClick={submit}>
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddOuvrierPageMain;
