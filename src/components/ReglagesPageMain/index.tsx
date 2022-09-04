import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { AiFillDownCircle } from "react-icons/ai";
import InformationsGenerales from "./InformationsGenerales";

const RéglagesPageMain = () => {
  return (
    <Box marginTop="2em">
      <Accordion
        style={{
          width: "98%",
          margin: "auto",
        }}
      >
        <AccordionSummary expandIcon={<AiFillDownCircle size={25} />}>
          Informations générales
        </AccordionSummary>
        <AccordionDetails>
          <InformationsGenerales />
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{
          width: "98%",
          margin: "auto",
        }}
      >
        <AccordionSummary expandIcon={<AiFillDownCircle size={25} />}>
          Heading
        </AccordionSummary>
        <AccordionDetails>blabla</AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default RéglagesPageMain;
