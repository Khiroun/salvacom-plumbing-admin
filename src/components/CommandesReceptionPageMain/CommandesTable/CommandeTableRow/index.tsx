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
  site: string;
  displayTime: string;
  price: [min: number, max: number];
};

const CommandeTableRow: FC<Props> = ({
  id,
  name,
  address,
  phone,
  site,
  displayTime,
  price,
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
      <TableCell>{site}</TableCell>
      <TableCell>{displayTime}</TableCell>
      <TableCell>
        {price[0]} - {price[1]}
      </TableCell>
      <TableCell>
        <ActionCellContent valider={valider} commandeId={id} />
      </TableCell>
    </>
  );
};

export default CommandeTableRow;
