import TableCell from "@mui/material/TableCell";
import { FC, useState } from "react";
import { updateDocument } from "../../../../firebase";
import ActionCellContent from "./ActionCellContent";
import { useRouter } from "next/router";
import DispatchOuvrierCell from "./DispatchOuvrierCell";

type Props = {
  id: string;
  name: string;
  address: string;
  phone: string;
  service: string;
  subService: string;
  site: string;
  displayTime: string;
};

const CommandeTableRow: FC<Props> = ({
  id,
  name,
  address,
  phone,
  service,
  subService,
  site,
  displayTime,
}) => {
  const [SelectedOuvrier, setSelectedOuvrier] = useState("");
  const router = useRouter();

  const valider = async () => {
    if (SelectedOuvrier) {
      await updateDocument("commandes", id, {
        ouvrier: SelectedOuvrier,
        status: "attente",
      });
      router.push("/commandes/attente");
    }
  };
  return (
    <>
      <DispatchOuvrierCell setSelectedOuvrier={setSelectedOuvrier} />
      <TableCell>{name}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{service}</TableCell>
      <TableCell>{subService}</TableCell>
      <TableCell>{site}</TableCell>
      <TableCell>{displayTime}</TableCell>
      <TableCell>
        <ActionCellContent valider={valider} commandeId={id} />
      </TableCell>
    </>
  );
};

export default CommandeTableRow;
