import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { FC } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
type Props = {
  valider: () => Promise<void>;
  commandeId: string;
};
const ActionCellContent: FC<Props> = ({ valider, commandeId }) => {
  return (
    <MenuList>
      <MenuItem onClick={valider}>Valider</MenuItem>
      <EditButton commandeId={commandeId} />
      <DeleteButton commandeId={commandeId} />
    </MenuList>
  );
};

export default ActionCellContent;
