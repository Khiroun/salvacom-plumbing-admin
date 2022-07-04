import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { ReactBingmaps } from "react-bingmaps";
import { addDocument } from "../../firebase";
import { AiFillCamera } from "react-icons/ai";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
};
const AddSiteButton: FC<Props> = ({ open, handleOpen, handleClose }) => {
  return (
    <Box sx={{ my: 5 }}>
      <Button variant="contained" size="large" onClick={handleOpen}>
        Ajouter un site
      </Button>
      <AddSiteModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default AddSiteButton;

type AddSiteModalProps = {
  open: boolean;
  handleClose: () => void;
};
const AddSiteModal: FC<AddSiteModalProps> = ({ open, handleClose }) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [loc, setLoc] = useState(null);
  const [siteName, setSiteName] = useState("");
  const [siteImages, setSiteImages] = useState([]);
  const [address, setAddress] = useState("");
  const [step, setStep] = useState(0);

  const addLoc = async () => {
    if (step === 1) {
      await addDocument("sites", {
        latitude: loc[0],
        longitude: loc[1],
        siteName,
        siteImages,
      });
      setLoc(null);
      handleClose();
    }
    if (step === 0) {
      setStep(1);
      //handleClose();
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {step === 0 && (
          <>
            <Typography variant="h6" component="h2">
              Séléctionnez sur la carte
            </Typography>
            <Box sx={{ mt: 2, height: "80vh" }}>
              {loc ? (
                <LocMap
                  pushPins={[
                    {
                      location: loc,
                      option: { color: "red" },
                    },
                  ]}
                  setLoc={setLoc}
                />
              ) : (
                <NoLocMap setLoc={setLoc} />
              )}
            </Box>
            {loc && (
              <Button variant="contained" size="large" onClick={addLoc}>
                Ajouter
              </Button>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <Typography variant="h6" component="h2">
              Informations sur le site
            </Typography>
            <Box
              flexDirection="column"
              display="flex"
              minHeight="50vh"
              justifyContent="space-around"
            >
              <TextField
                label="Nom du site"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
              <TextField
                label="Adresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <>
                <label htmlFor="site-images-button">
                  <input
                    accept="image/*"
                    id="site-images-button"
                    multiple
                    type="file"
                    style={{
                      display: "none",
                    }}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<AiFillCamera />}
                  >
                    Upload
                  </Button>
                </label>
              </>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

type NoLocMapProps = {
  setLoc: (any) => void;
};
const NoLocMap: FC<NoLocMapProps> = ({ setLoc }) => {
  return (
    <ReactBingmaps
      bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
      center={[36.716, 3.003]}
      getLocation={{
        addHandler: "click",
        callback: (loc) => {
          setLoc([loc.latitude, loc.longitude]);
        },
      }}
    ></ReactBingmaps>
  );
};

type LocMapProps = {
  pushPins: any[];
  setLoc: (loc: any) => void;
};

const LocMap: FC<LocMapProps> = ({ pushPins, setLoc }) => {
  return (
    <ReactBingmaps
      bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
      center={[36.716, 3.003]}
      pushPins={pushPins}
      getLocation={{
        addHandler: "click",
        callback: (loc) => {
          setLoc([loc.latitude, loc.longitude]);
        },
      }}
    ></ReactBingmaps>
  );
};
