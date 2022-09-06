import { Typography } from "@mui/material";
import { FC } from "react";
import SectionTitle from "../SectionTitle";
import AddSiteButton from "./AddSiteButton";
import SitesSection from "./SitesSection";

type Props = {
  serviceId: string;
};
const ServiceSites: FC<Props> = ({ serviceId }) => {
  return (
    <div
      style={{
        marginTop: "1em",
      }}
    >
      <AddSiteButton serviceId={serviceId} />
      <SitesSection />
    </div>
  );
};
export default ServiceSites;
