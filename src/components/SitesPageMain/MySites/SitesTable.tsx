import { Button, IconButton, TableCell } from "@mui/material";
import { FC, useState } from "react";
import styled from "@emotion/styled";
import MyTable from "../../MyTable";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Dialog from "../../Dialog";
type Props = {
  sites: Array<any>;
  deleteSite: (id: string) => void;
};
const SitesTable: FC<Props> = ({ sites, deleteSite }) => {
  const columns = ["Nom", "Adresse", "images", ""];
  return (
    <MyTable
      data={sites}
      columns={columns}
      renderRow={(site) => <Row site={site} deleteSite={deleteSite} />}
    />
  );
};

const Row = ({ site, deleteSite }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = site.images ? site.images : [];
  const increment = () => {
    setImageIndex((prev) => {
      if (prev + 1 >= images.length) {
        return 0;
      }
      return prev + 1;
    });
  };
  const decrement = () => {
    setImageIndex((prev) => {
      if (prev - 1 < 0) {
        return images.length - 1;
      }
      return prev - 1;
    });
  };
  return (
    <>
      <TableCell>{site.siteName}</TableCell>
      <TableCell>{site.address}</TableCell>
      <ImagesCell>
        <SiteImage src={images[imageIndex]} alt="site" />
        {images.length > 1 && (
          <>
            <ArrowLeft onClick={decrement}>
              <FaArrowLeft />
            </ArrowLeft>
            <ArrowRight>
              <FaArrowRight onClick={increment} />
            </ArrowRight>
          </>
        )}
      </ImagesCell>
      <TableCell>
        <Dialog
          buttonText="Supprimer"
          title="Etes sous sur de vouloir supprimer ce site ?"
          yesButtonStyle={{ color: "red" }}
          action={() => deleteSite(site.id)}
          buttonStyle={{ color: "red" }}
        />
      </TableCell>
    </>
  );
};
export default SitesTable;
const SiteImage = styled.img`
  max-width: 100%;
`;
const ImagesCell = styled(TableCell)`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ArrowLeft = styled(IconButton)`
  position: absolute;
  left: 1em;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  background: #000;
`;
const ArrowRight = styled(IconButton)`
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  background: #000;
`;
