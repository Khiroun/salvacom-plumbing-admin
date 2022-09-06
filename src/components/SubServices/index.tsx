import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Container from "@mui/material/Container";
import { doc, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { db, updateDocument } from "../../firebase";
import SectionTitle from "../SectionTitle";
import AddSubServiceButton from "./AddSubServiceButton";
import EditSubServiceButton from "./EditSubServiceButton";

type Props = {
  serviceId: string;
};
const SubServices: FC<Props> = ({ serviceId }) => {
  const [subServices, setSubServices] = useState([]);
  useEffect(() => {
    const docRef = doc(db, "services", serviceId);
    const unseb = onSnapshot(docRef, (res) => {
      const data = res.data();
      if (data.subServices) {
        setSubServices(data.subServices);
      }
    });
    return unseb;
  }, []);
  return (
    <Container sx={{ mb: 5 }}>
      <SectionTitle>Sous-services</SectionTitle>
      <AddSubServiceButton serviceId={serviceId} subServices={subServices} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prix Min</TableCell>
              <TableCell>Prix max</TableCell>
              <TableCell>Gérer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subServices.map((subService, i) => {
              return (
                <TableRow key={subService.name}>
                  <TableCell>{subService.name}</TableCell>
                  <TableCell>{subService.price[0]}</TableCell>
                  <TableCell>{subService.price[1]}</TableCell>
                  <TableCell>
                    <EditSubServiceButton
                      serviceId={serviceId}
                      name={subService.name}
                      price={subService.price}
                      subServices={subServices}
                    />
                    <IconButton
                      color="error"
                      onClick={async () => {
                        const newSubServices = subServices.filter(
                          (item) => item.name !== subService.name
                        );
                        await updateDocument("services", serviceId, {
                          subServices: newSubServices,
                        });
                      }}
                    >
                      <AiFillDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SubServices;
