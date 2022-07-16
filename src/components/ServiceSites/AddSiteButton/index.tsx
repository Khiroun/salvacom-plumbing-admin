import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FC, useEffect, useState } from "react";
import { getAll, getDocument, updateDocument } from "../../../firebase";
type Props = {
  serviceId: string;
};
const AddSiteButton: FC<Props> = ({ serviceId }) => {
  const [open, setOpen] = useState(false);
  const [selectedSites, setSelectedSites] = useState([]);
  const [sites, setSites] = useState([]);
  useEffect(() => {
    getAll("sites").then((sites) => {
      setSites(sites);
    });
  }, []);
  useEffect(() => {
    getDocument("services", serviceId).then((res) => {
      const sites = res.sites;
      if (sites) {
        setSelectedSites(sites);
      }
    });
  }, []);
  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Gérer les sites
      </Button>
      <Modal open={open}>
        <Box
          bgcolor="#fff"
          width="80vw"
          height="80vh"
          marginTop="10vh"
          marginLeft="10vw"
          position="relative"
          padding="10px"
        >
          <ul
            style={{
              listStyle: "none",
            }}
          >
            {sites.map((site) => {
              return (
                <li key={site.id} style={{}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          if (selectedSites.includes(site.id)) {
                            const newSites = selectedSites.filter(
                              (siteId) => siteId !== site.id
                            );
                            setSelectedSites(newSites);
                          } else {
                            setSelectedSites([...selectedSites, site.id]);
                          }
                        }}
                        checked={selectedSites.includes(site.id)}
                      />
                    }
                    label={site.siteName}
                  />
                </li>
              );
            })}
          </ul>
          <Box position="absolute" bottom="10px" right="10px">
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={async () => {
                await updateDocument("services", serviceId, {
                  sites: selectedSites,
                });
                setOpen(false);
              }}
            >
              Confirmer
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "#888",
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
    </Container>
  );
};

export default AddSiteButton;
