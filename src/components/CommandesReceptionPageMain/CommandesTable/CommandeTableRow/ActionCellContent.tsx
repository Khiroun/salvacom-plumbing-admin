import { AiFillSetting } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { FC, useState } from "react";
import DeleteButton from "./DeleteButton";
type Props = {
  valider: () => Promise<void>;
  commandeId: string;
};
const ActionCellContent: FC<Props> = ({ valider, commandeId }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <AiFillSetting />
      </IconButton>
      <Collapse in={open}>
        <MenuList>
          <MenuItem onClick={valider}>Valider</MenuItem>

          <MenuItem>Modifier</MenuItem>
          <DeleteButton commandeId={commandeId} />
        </MenuList>
      </Collapse>
    </>
  );
};

export default ActionCellContent;
