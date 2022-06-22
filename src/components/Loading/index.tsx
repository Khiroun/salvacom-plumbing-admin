import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Loading = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        aspectRatio: {
          xs: "1",
          md: "2",
        },
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
