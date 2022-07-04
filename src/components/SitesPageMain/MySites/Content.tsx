import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import { FC } from "react";
import { Button, Grid, Typography } from "@mui/material";

type Props = {
  close: () => void;
  site: any;
  deleteSite: (id: string) => Promise<void>;
};

const Content: FC<Props> = ({ close, site, deleteSite }) => {
  return (
    <Box position="relative" padding={1}>
      <CloseButton size={25} onClick={close} />
      <Box display="flex" flexDirection="column" marginTop="2em">
        <Typography
          variant="body1"
          color="Highlight"
          textAlign="center"
          marginBottom={2}
          fontSize="1.5em"
        >
          {site.siteName}
        </Typography>
        <Box display="flex">
          <BiMapPin size={50} />
          <Typography variant="body2">{site.address}</Typography>
        </Box>
        <Grid container marginTop="1em">
          {site.images &&
            site.images.map((img) => {
              return (
                <Grid key={img} item md={6}>
                  <SiteImage src={img} />
                </Grid>
              );
            })}
        </Grid>
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          color="error"
          onClick={() => deleteSite(site.id)}
        >
          Supprimer
        </Button>
      </Box>
    </Box>
  );
};

const CloseButton = styled(AiFillCloseCircle)`
  position: absolute;
  right: 0.35em;
  top: 0.35em;
`;

const SiteImage = styled.img`
  max-width: 100%;
`;

export default Content;
