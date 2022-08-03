import { Box } from "@mui/material";
import { FC, useState } from "react";
import { ReactBingmaps } from "react-bingmaps";

type Props = {
  open: () => void;
  sites: any[];
  updateSite: (site: any) => void;
};

const MySitesMap: FC<Props> = ({ open, sites, updateSite }) => {
  const [deleting, setDeleting] = useState(false);
  const pushPins = sites.map((site) => {
    return {
      location: [site.latitude, site.longitude],
      option: { color: "green" },
      addHandler: {
        type: "click",
        callback: () => {
          onPushPinClicked(site);
        },
      },
    };
  });
  const onPushPinClicked = async (site: any) => {
    const id = site.id;
    updateSite(site);
    open();
  };
  return (
    <Box maxWidth="100%" height="70vh">
      {pushPins.length === 0 && (
        <ReactBingmaps
          bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
          center={[36.716, 3.003]}
        ></ReactBingmaps>
      )}
      {!deleting && pushPins.length > 0 && (
        <ReactBingmaps
          bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
          center={[36.716, 3.003]}
          pushPins={pushPins}
        ></ReactBingmaps>
      )}
    </Box>
  );
};

export default MySitesMap;
