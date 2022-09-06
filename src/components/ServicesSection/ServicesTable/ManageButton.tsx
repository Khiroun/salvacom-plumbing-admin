import Button from "@mui/material/IconButton";
import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
type Props = {
  id: string;
};
const ManageButton: FC<Props> = ({ id }) => {
  return (
    <Button>
      <a href={`/services/${id}`}>
        <AiOutlineEdit color="black" />
      </a>
    </Button>
  );
};

export default ManageButton;
