import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { ReactBingmaps } from "react-bingmaps";
import { addDocument } from "../../firebase";

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
  const addLoc = async () => {
    await addDocument("sites", { latitude: loc[0], longitude: loc[1] });
    setLoc(null);
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
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
};

const LocMap: FC<LocMapProps> = ({ pushPins }) => {
  return (
    <ReactBingmaps
      bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
      center={[36.716, 3.003]}
      pushPins={pushPins}
    ></ReactBingmaps>
  );
};
