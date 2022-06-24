import { ReactBingmaps } from "react-bingmaps";
import Box from "@mui/material/Box";
import { FC } from "react";
type Props = {
  handleClick?: (loc: any) => void;
  pushPins?: any[];
};
const Map: FC<Props> = ({ handleClick, pushPins }) => {
  return (
    <Box maxWidth="100%" height="70vh">
      <ReactBingmaps
        bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
        center={[36.716, 3.003]}
        getLocation={{
          addHandler: "click",
          callback: (loc) => {
            if (handleClick) handleClick(loc);
          },
        }}
        pushPins={pushPins}
      ></ReactBingmaps>
    </Box>
  );
};

export default Map;
