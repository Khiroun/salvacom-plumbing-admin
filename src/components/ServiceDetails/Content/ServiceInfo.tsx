import { useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { updateDocument } from "../../../firebase";
type Props = {
  serviceName: string;
  serviceDescription: string;
  serviceId: string;
};
const ServiceInfo: FC<Props> = ({
  serviceDescription,
  serviceName,
  serviceId,
}) => {
  const [updatingName, setUpdatingName] = useState(false);
  const [updatingDescription, setUpdatingDescription] = useState(false);

  const updateNameClicked = async () => {
    const newName = prompt("Modifier le nom de service", serviceName);
    setUpdatingName(true);
    updateDocument("services", serviceId, {
      name: newName,
    });
    setUpdatingName(false);
  };
  const updateDescriptionClicked = async () => {
    const newDescription = prompt(
      "Modifier la description du service",
      serviceDescription
    );
    setUpdatingDescription(true);
    updateDocument("services", serviceId, {
      description: newDescription,
    });
    setUpdatingDescription(false);
  };
  return (
    <Box padding={1}>
      <Box display="flex">
        {updatingName ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4">Nom: {serviceName}</Typography>
            <IconButton onClick={updateNameClicked}>
              <AiOutlineEdit />
            </IconButton>
          </>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        {updatingDescription ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="body1">
              Description: {serviceDescription}
            </Typography>
            <IconButton onClick={updateDescriptionClicked}>
              <AiOutlineEdit />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ServiceInfo;
