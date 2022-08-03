import MySitesMap from "./MySitesMap";
import styled from "@emotion/styled";
import { useState } from "react";
import Content from "./Content";
import { deleteDocument, useGetAllSnapshot } from "../../../firebase";
import { CircularProgress } from "@mui/material";
import SitesTable from "./SitesTable";

const MySites = () => {
  const [isopen, setIsOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState({});
  const [deleting, setDeleting] = useState(false);
  const { data } = useGetAllSnapshot("sites");
  const deleteSite = async (id: string) => {
    setDeleting(true);
    const userResponse = confirm("Voulez vous vraiment supprimer ce site?");
    if (userResponse) {
      await deleteDocument("sites", id);
      setIsOpen(false);
      setSelectedSite({});
    }
    setDeleting(false);
  };
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <SitesTable sites={data} deleteSite={deleteSite} />
      <ContentContainer open={isopen}>
        {deleting ? (
          <CircularProgress />
        ) : (
          <Content close={close} site={selectedSite} deleteSite={deleteSite} />
        )}
      </ContentContainer>

      <MapContainer>
        <MySitesMap open={open} sites={data} updateSite={setSelectedSite} />
      </MapContainer>
    </Wrapper>
  );
};

export default MySites;

const MapContainer = styled.div`
  flex: 4;
`;
const ContentContainer = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
  flex: 1;
  max-width: 25%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
