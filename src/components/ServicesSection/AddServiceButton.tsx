import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ChangeEventHandler, useState } from "react";
import SectionTitle from "../SectionTitle";
import TextField from "@mui/material/TextField";
import { AiFillCamera } from "react-icons/ai";
import Grid from "@mui/material/Grid";
import { addDocument } from "../../firebase/db";
import { uploadFile } from "../../firebase/storage";
const AddServiceButton = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const onImageChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    const image = e.target.files.length > 0 && e.target.files[0];
    setImage(image);
  };
  const submit = async () => {
    setLoading(true);
    const imageUrl = await uploadFile(`service${Date()}`, image);
    await addDocument("services", {
      name,
      description,
      imageUrl,
    });
    setLoading(false);
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{
          mb: 3,
          mt: 3,
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Ajouter un service
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          bgcolor="#fff"
          minWidth="60vw"
          minHeight="60vh"
          maxWidth="90vw"
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          padding="1rem"
        >
          <SectionTitle>Ajouter un service</SectionTitle>
          <Grid container>
            <Grid item md={6} padding="1rem">
              <TextField
                label="Nom du service"
                fullWidth
                sx={{ mb: 1 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Description du service"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item md={6} padding="1rem" position="relative">
              <label htmlFor="contained-button-file">
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{
                    display: "none",
                  }}
                  onChange={onImageChanged}
                />
                {image ? (
                  <img
                    alt=""
                    src={URL.createObjectURL(image)}
                    style={{
                      maxWidth: "60%",
                      maxHeight: "60%",
                      marginTop: "1rem",
                    }}
                  />
                ) : (
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<AiFillCamera />}
                    sx={{
                      mt: 1,
                    }}
                  >
                    Photo
                  </Button>
                )}
              </label>
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={submit}
                  disabled={loading}
                >
                  VALIDER
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  ANNULER
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AddServiceButton;
