import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { AiFillDownCircle } from "react-icons/ai";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";

type Props = {
  text: string;
  toggle: () => void;
};
const MyMenuItem: FC<Props> = ({ text, toggle }) => {
  return (
    <StyledMenuItem active={"true"} key={text}>
      <>
        <ListItemText>{text}</ListItemText>
      </>
      <IconButton onClick={toggle}>
        <AiFillDownCircle />
      </IconButton>
    </StyledMenuItem>
  );
};
const StyledMenuItem = styled(MenuItem)<{ active: boolean | string }>`
  background-color: ${({ active }) => (active ? "rgba(0,0,0,0.2)" : "inhirit")};
  color: ${({ active }) => (active ? "#1565c0" : "inhirit")};
  position: relative;
  &:before {
    content: "";
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: #1565c0;
    position: absolute;
    display: ${({ active }) => (active ? "inhirit" : "none")};
  }
`;

export default MyMenuItem;
