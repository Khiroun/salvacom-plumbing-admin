import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FC, useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { updateDocument } from "../../firebase";
type Props = {
  serviceId: string;
  subServices: any[];
};
const AddSubServiceButton: FC<Props> = ({ serviceId, subServices }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState([0, 0]);
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Ajouter un sous-service
      </Button>
      <Modal open={open}>
        <Box
          padding="1em"
          bgcolor="#fff"
          width="40vw"
          height="40vh"
          marginTop="30vh"
          marginLeft="30vw"
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box>
            <TextField
              label="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box marginTop="1em">
              <Typography>Prix</Typography>
              <TextField
                label="Min"
                type="number"
                value={price[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (typeof value === "number" && value >= 0) {
                    setPrice((prev) => [value, prev[1]]);
                  }
                }}
              />
              <TextField
                label="Max"
                type="number"
                value={price[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (typeof value === "number" && value >= 0)
                    setPrice((prev) => [prev[0], value]);
                }}
              />
            </Box>
          </Box>
          <Box position="absolute" bottom="1em" right="1em">
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              disabled={name.length < 3 && price[1] === 0}
              onClick={async () => {
                await updateDocument("services", serviceId, {
                  subServices: [
                    ...subServices,
                    {
                      name,
                      price,
                    },
                  ],
                });
                setName("");
                setPrice([0, 0]);
                setOpen(false);
              }}
            >
              Valider
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "#777",
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddSubServiceButton;
