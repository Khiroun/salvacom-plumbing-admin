import styled from "@emotion/styled";
import { FC, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import MenuList from "@mui/material/MenuList";
import { AiFillDownCircle } from "react-icons/ai";

type Props = {
  link: string;
  text: string;
  subLinks: {
    link: string;
    text: string;
  }[];
};
const SublinksMenuItem: FC<Props> = ({ link, text, subLinks }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = router.asPath;

  return (
    <Box>
      <StyledMenuItem active={path.includes(link) ? "true" : ""} key={text}>
        <Link href={link}>
          <ListItemText>{text}</ListItemText>
        </Link>
        <IconButton
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <AiFillDownCircle />
        </IconButton>
      </StyledMenuItem>
      <Collapse in={open}>
        <MenuList
          style={{
            marginLeft: "1em",
          }}
        >
          {subLinks.map((subLink) => {
            return (
              <MenuItem key={subLink.text + subLink.link}>
                <Link href={subLink.link}>{subLink.text}</Link>
              </MenuItem>
            );
          })}
        </MenuList>
      </Collapse>
    </Box>
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
const Link = styled.a`
  width: 100%;
`;
export default SublinksMenuItem;
