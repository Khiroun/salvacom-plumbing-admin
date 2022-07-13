import Button from "@mui/material/IconButton";
import { FC } from "react";
import { AiFillSetting } from "react-icons/ai";
type Props = {
  id: string;
};
const ManageButton: FC<Props> = ({ id }) => {
  return (
    <Button>
      <a href={`/services/${id}`}>
        <AiFillSetting />
      </a>
    </Button>
  );
};

export default ManageButton;
