import { AiFillSetting } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { FC, useState } from "react";
type Props = {
  valider: () => Promise<void>;
};
const ActionCellContent: FC<Props> = ({ valider }) => {
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
          <MenuItem>Annuler</MenuItem>
          <MenuItem>Modifier</MenuItem>
        </MenuList>
      </Collapse>
    </>
  );
};

export default ActionCellContent;
