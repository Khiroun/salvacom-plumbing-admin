import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getDocument, updateDocument } from "../../firebase";
import { uploadFile } from "../../firebase/storage";
const HeadingSection = () => {
  const theme = useTheme();
  const [headingInfo, setHeadingInfo] = useState({
    title: "",
    subTitle: "",
    backgroundImage: "",
  });
  useEffect(() => {
    getDocument("siteSettings", "heading-section").then((doc) => {
      setHeadingInfo({
        ...headingInfo,
        ...doc,
      });
    });
  }, []);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="Titre"
          value={headingInfo.title}
          onChange={(e) => {
            setHeadingInfo({ ...headingInfo, title: e.target.value });
          }}
          multiline
          rows={2}
          style={{
            width: "80%",
          }}
        />
        <Button
          onClick={async () => {
            await updateDocument("siteSettings", "heading-section", {
              title: headingInfo.title,
            });
            alert("Titre modifié avec succès");
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
          label="Sous titre"
          value={headingInfo.subTitle}
          onChange={(e) => {
            setHeadingInfo({
              ...headingInfo,
              subTitle: e.target.value,
            });
          }}
          multiline
          rows={3}
          style={{
            width: "80%",
          }}
        />
        <Button
          onClick={async () => {
            await updateDocument("siteSettings", "heading-section", {
              subTitle: headingInfo.subTitle,
            });
            alert("Sous titre modifié avec succès");
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
      <Box>
        <Typography variant="h5">Image</Typography>
        <Box
          style={{
            position: "relative",
          }}
        >
          <img
            src={headingInfo.backgroundImage}
            alt=""
            style={{
              maxWidth: "100%",
            }}
          />
          <input
            accept="image/*"
            type="file"
            id="bg-image-input"
            style={{
              display: "none",
            }}
            onChange={async (e) => {
              const file = e.target.files && e.target.files[0];
              if (!file) return;
              const newURL = URL.createObjectURL(file);
              setHeadingInfo({
                ...headingInfo,
                backgroundImage: newURL,
              });
              const uploadURL = await uploadFile("heading-background", file);
              updateDocument("siteSettings", "heading-section", {
                backgroundImage: uploadURL,
              });
            }}
          />

          <label
            htmlFor="bg-image-input"
            style={{
              padding: "16px 8px",
              borderRadius: "4px",
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            Modifier
          </label>
        </Box>
      </Box>
    </Box>
  );
};

export default HeadingSection;
