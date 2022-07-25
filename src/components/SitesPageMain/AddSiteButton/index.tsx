import { CircularProgress, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { ReactBingmaps } from "react-bingmaps";
import { addDocument, getAll } from "../../../firebase";
import { AiFillCamera } from "react-icons/ai";
import getAddress from "../../../utils/getAddress";
import { uploadFile } from "../../../firebase/storage";

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
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    if (loc) {
      getAddress(loc[0], loc[1]).then((addr) => {
        setAddress(addr);
      });
    }
  }, [loc]);
  const addLoc = async () => {
    setAdding(true);
    const imageUrlsPromises = siteImages.map((si, i) => {
      return uploadFile(`location${i}${Date()}`, si);
    });
    const imageUrls = await Promise.all(imageUrlsPromises);
    await addDocument("sites", {
      latitude: loc[0],
      longitude: loc[1],
      siteName,
      images: imageUrls,
      address,
    });
    setLoc(null);
    setSiteName("");
    setSiteImages([]);
    setStep(0);
    setAdding(false);
    handleClose();
  };
  const nextClicked = () => {
    setStep(1);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {adding && <CircularProgress />}
        {!adding && step === 0 && (
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
              <Button variant="contained" size="large" onClick={nextClicked}>
                Suivant
              </Button>
            )}
          </>
        )}
        {!adding && step === 1 && (
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
                    onChange={(e) => {
                      const fileList = e.target.files;
                      const files: File[] = [];
                      for (let i = 0; i < fileList.length; i++) {
                        files.push(fileList.item(i));
                      }
                      setSiteImages(files);
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
              <Button variant="contained" size="large" onClick={addLoc}>
                Ajouter
              </Button>
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
  const [pushPins, setPushPins] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAll("sites").then((sites) => {
      setPushPins(
        sites.map((site) => {
          return {
            location: [site.latitude, site.longitude],
            option: { color: "green" },
          };
        })
      );
      setLoading(false);
    });
  }, []);
  if (loading) return <CircularProgress />;
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
      pushPins={pushPins}
    ></ReactBingmaps>
  );
};

type LocMapProps = {
  pushPins: any[];
  setLoc: (loc: any) => void;
};

const LocMap: FC<LocMapProps> = ({ pushPins, setLoc }) => {
  const [pps, setPps] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAll("sites").then((sites) => {
      setPps(
        sites.map((site) => {
          return {
            location: [site.latitude, site.longitude],
            option: { color: "green" },
          };
        })
      );
      setLoading(false);
    });
  }, []);
  if (loading) return <CircularProgress />;
  const pp = [...pps, ...pushPins];
  return (
    <ReactBingmaps
      bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
      center={[36.716, 3.003]}
      pushPins={pp}
      getLocation={{
        addHandler: "click",
        callback: (loc) => {
          setLoc([loc.latitude, loc.longitude]);
        },
      }}
    ></ReactBingmaps>
  );
};
