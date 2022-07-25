import { FC, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getDocument } from "../../../../../firebase";
import { CircularProgress } from "@mui/material";
type Props = {
  serviceId: string;
  handleChange: (serviceId: string) => void;
  value: string;
};
const SubServiceInput: FC<Props> = ({ serviceId, handleChange, value }) => {
  const [subServices, setSubServices] = useState([]);

  const [selectedServiceLoading, setSelectedServiceLoading] = useState(true);
  useEffect(() => {
    setSelectedServiceLoading(true);
    getDocument("services", serviceId).then((service) => {
      setSubServices(service.subServices);
      setSelectedServiceLoading(false);
    });
  }, [serviceId]);
  if (selectedServiceLoading) return <CircularProgress />;
  return (
    <FormControl
      fullWidth
      sx={{
        marginBottom: "1em",
      }}
    >
      <InputLabel>Sous service</InputLabel>
      <Select
        value={value}
        label="Sous service"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        {subServices &&
          subServices.map((subService) => {
            return (
              <MenuItem value={subService.name} key={subService.name}>
                {subService.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SubServiceInput;
