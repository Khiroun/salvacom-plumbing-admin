import { FC, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteDocument } from "../../../firebase";

type Props = {
  ouvrierId: string;
};
const ActionCell: FC<Props> = ({ ouvrierId }) => {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  return (
    <TableCell>
      <IconButton
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <AiOutlineEdit color="black" />
      </IconButton>
      <Collapse in={open}>
        <MenuList>
          <MenuItem
            onClick={async () => {
              setDeleting(true);
              await deleteDocument("ouvriers", ouvrierId);
              setDeleting(false);
            }}
            disabled={deleting}
          >
            {deleting ? "Suppression en cours..." : "Supprimer"}
          </MenuItem>
        </MenuList>
      </Collapse>
    </TableCell>
  );
};

export default ActionCell;
