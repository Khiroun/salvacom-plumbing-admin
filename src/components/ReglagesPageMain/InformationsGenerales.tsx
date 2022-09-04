import { Box, Button, Divider, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { getDocument, updateDocument } from "../../firebase";
const InformationsGenerales = () => {
  const [generalInfo, setGeneralInfo] = useState({
    phone: "",
    email: "",
    address: "",
  });
  useEffect(() => {
    getDocument("siteSettings", "general-info").then((doc) => {
      setGeneralInfo({
        ...generalInfo,
        ...doc,
      });
    });
  }, []);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="Téléphone"
          type="tel"
          value={generalInfo.phone}
          onChange={(e) => {
            setGeneralInfo({ ...generalInfo, phone: e.target.value });
          }}
        />
        <Button
          onClick={async () => {
            await updateDocument("siteSettings", "general-info", {
              phone: generalInfo.phone,
            });
            alert("Numéro de téléphone modifié avec succès");
          }}
        >
          Modifier
        </Button>
      </Box>
      <Divider
        style={{
          marginBottom: "1em",
        }}
      />
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="Email"
          type="email"
          value={generalInfo.email}
          onChange={(e) => {
            setGeneralInfo({
              ...generalInfo,
              email: e.target.value,
            });
          }}
        />
        <Button
          onClick={async () => {
            await updateDocument("siteSettings", "general-info", {
              email: generalInfo.email,
            });
            alert("Email modifié avec succès");
          }}
        >
          Modifier
        </Button>
      </Box>
      <Divider
        style={{
          marginBottom: "1em",
        }}
      />
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="Adresse"
          value={generalInfo.address}
          onChange={(e) => {
            setGeneralInfo({
              ...generalInfo,
              address: e.target.value,
            });
          }}
        />
        <Button
          onClick={async () => {
            await updateDocument("siteSettings", "general-info", {
              address: generalInfo.address,
            });
            alert("Adresse modifiée avec succès");
          }}
        >
          Modifier
        </Button>
      </Box>
    </Box>
  );
};

export default InformationsGenerales;
