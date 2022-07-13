import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useState } from "react";
type Props = {
  imageURL: string;
  updateImage: (imageFile: File) => void;
};
const ImageSection: FC<Props> = ({ imageURL, updateImage }) => {
  const theme = useTheme();
  return (
    <Box position="relative" minHeight="50vh">
      <input
        type="file"
        id={`service${imageURL}`}
        style={{
          display: "none",
        }}
        onChange={(e) => {
          const newImage = e.target.files && e.target.files[0];
          newImage && updateImage(newImage);
        }}
      />
      <label
        htmlFor={`service${imageURL}`}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "1em",
        }}
      >
        <img src={imageURL} style={{ maxWidth: "100%" }} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            top: "50%",
            color: "#fff",
            background: theme.palette.primary.main,
            padding: "0.5em",
            borderRadius: "5px",
          }}
        >
          Modifier
        </div>
      </label>
    </Box>
  );
};

export default ImageSection;
