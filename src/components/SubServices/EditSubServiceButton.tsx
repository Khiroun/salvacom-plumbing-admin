import { useState, FC } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  TextField,
} from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import SubServices from ".";
import { updateDocument } from "../../firebase";
type Props = {
  serviceId: string;
  name: string;
  price: [min: number, max: number];
  subServices: any[];
};
const EditSubServiceButton: FC<Props> = ({
  serviceId,
  name,
  price,
  subServices,
}) => {
  const [open, setOpen] = useState(false);
  const [validating, setValidating] = useState(false);
  const [theName, setTheName] = useState(name);
  const [theMinPrice, setTheMinPrice] = useState(price[0]);
  const [theMaxPrice, setTheMaxPrice] = useState(price[1]);
  const toggle = () => setOpen((prev) => !prev);
  const validerClicked = async () => {
    setValidating(true);
    const newSubServices = subServices.map((subService) => {
      if (subService.name !== name) return subService;
      return {
        ...subService,
        name: theName,
        price: [theMinPrice, theMaxPrice],
      };
    });
    await updateDocument("services", serviceId, {
      subServices: newSubServices,
    });
    setValidating(false);
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={toggle}>
        <AiFillEdit color="black" />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Modifier le sous service</DialogTitle>
        <DialogContent
          style={{
            padding: "1em",
            width: "50vw",
          }}
        >
          <Box>
            <TextField
              label="Nom"
              value={theName}
              onChange={(e) => setTheName(e.target.value)}
            />
          </Box>

          <Box marginTop="1em">
            <Box
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <TextField
                label="Prix min"
                type="number"
                style={{
                  width: "40%",
                  marginRight: "1em",
                }}
                value={theMinPrice}
                onChange={(e) => setTheMinPrice(parseInt(e.target.value))}
              />
              <TextField
                label="Prix max"
                type="number"
                style={{
                  width: "40%",
                }}
                value={theMaxPrice}
                onChange={(e) => setTheMaxPrice(parseInt(e.target.value))}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Fermer</Button>
          <Button variant="contained" onClick={validerClicked}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditSubServiceButton;
