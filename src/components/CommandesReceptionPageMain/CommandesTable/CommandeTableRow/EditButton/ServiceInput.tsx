import { FC, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAll, getDocument } from "../../../../../firebase";
import { CircularProgress } from "@mui/material";
type Props = {
  serviceId: string;
  handleChange: (serviceId: string) => void;
  value: string;
};
const ServiceInput: FC<Props> = ({ serviceId, handleChange, value }) => {
  const [selectedService, setSelectedService] = useState<{
    [x: string]: string;
  }>({});
  const [services, setServices] = useState([]);
  const [selectedServiceLoading, setSelectedServiceLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);
  useEffect(() => {
    setSelectedServiceLoading(true);
    getDocument("services", serviceId).then((service) => {
      setSelectedService(service);
      setSelectedServiceLoading(false);
    });
  }, []);
  useEffect(() => {
    setServicesLoading(true);
    getAll("services").then((services) => {
      setServices(services);
      setServicesLoading(false);
    });
  }, []);
  if (selectedServiceLoading || servicesLoading) return <CircularProgress />;
  return (
    <FormControl
      fullWidth
      sx={{
        marginBottom: "1em",
      }}
    >
      <InputLabel>Service</InputLabel>
      <Select
        value={value}
        label="Age"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        defaultValue={selectedService.id}
      >
        {services.map((service) => {
          return (
            <MenuItem value={service.id} key={service.id}>
              {service.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ServiceInput;
