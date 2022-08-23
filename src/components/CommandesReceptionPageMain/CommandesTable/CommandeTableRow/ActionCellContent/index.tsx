import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { FC, useEffect, useState } from "react";
import { getDocument } from "../../../../../firebase";
import CommandeDetailsModal from "../../../../CommandeDetailsModal";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
type Props = {
  valider: () => Promise<void>;
  commandeId: string;
};
const ActionCellContent: FC<Props> = ({ valider, commandeId }) => {
  const [commande, setCommande] = useState({});
  useEffect(() => {
    getDocument("commandes", commandeId).then((commande) => {
      setCommande(commande);
    });
  }, []);
  return (
    <MenuList>
      <MenuItem onClick={valider}>Valider</MenuItem>
      <EditButton commandeId={commandeId} />
      <DeleteButton commandeId={commandeId} />
      <CommandeDetailsModal commande={commande} />
    </MenuList>
  );
};

export default ActionCellContent;
