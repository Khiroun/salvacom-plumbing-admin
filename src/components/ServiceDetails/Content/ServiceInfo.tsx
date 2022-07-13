import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
type Props = {
  serviceName: string;
  serviceDescription: string;
};
const ServiceInfo: FC<Props> = ({ serviceDescription, serviceName }) => {
  return (
    <Box padding={1}>
      <Typography variant="h4">{serviceName}</Typography>
      <Typography variant="body1">{serviceDescription}</Typography>
    </Box>
  );
};

export default ServiceInfo;
