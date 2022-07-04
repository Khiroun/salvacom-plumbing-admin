import MySitesMap from "./MySitesMap";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Content from "./Content";
import { collection, onSnapshot } from "firebase/firestore";
import { db, deleteDocument } from "../../../firebase";
import { CircularProgress } from "@mui/material";

const MySites = () => {
  const [isopen, setIsOpen] = useState(false);
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState({});
  const [deleting, setDeleting] = useState(false);
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
  useEffect(() => {
    const ref = collection(db, "sites");
    const unsub = onSnapshot(ref, (snap) => {
      const res = [];
      snap.forEach((elem) => {
        const data = elem.data();
        console.log(data);
        res.push({
          ...data,
          id: elem.id,
        });
      });
      setSites(res);
    });
    return unsub;
  }, []);
  return (
    <Wrapper>
      <ContentContainer open={isopen}>
        {deleting ? (
          <CircularProgress />
        ) : (
          <Content close={close} site={selectedSite} deleteSite={deleteSite} />
        )}
      </ContentContainer>

      <MapContainer>
        <MySitesMap open={open} sites={sites} updateSite={setSelectedSite} />
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
`;
