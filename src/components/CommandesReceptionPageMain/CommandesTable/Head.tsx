import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const Head = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Dispatch Ouvrier</TableCell>
        <TableCell>Nom Et Prénom</TableCell>
        <TableCell>Adresse</TableCell>
        <TableCell>Téléphone</TableCell>
        <TableCell>Service</TableCell>
        <TableCell>Sous service</TableCell>
        <TableCell>Site</TableCell>
        <TableCell>Envoyé le</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default Head;
