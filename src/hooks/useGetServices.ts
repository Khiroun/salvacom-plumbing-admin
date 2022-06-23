import { useState } from "react";
import { getAll } from "../firebase";

const useGetServices = () => {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(false);
  const getServices = async () => {
    setLoading(true);
    const services = await getAll("services");
    setServices(services);
    setLoading(false);
  };
  return {
    services,
    loading,
    getServices,
  };
};
export default useGetServices;
