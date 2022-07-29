import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import MenuList from "@mui/material/MenuList";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  subLinks: {
    link: string;
    text: string;
  }[];
};
const MyCollapse: FC<Props> = ({ open, subLinks }) => {
  const router = useRouter();
  const path = router.asPath;
  return (
    <Collapse in={open}>
      <MenuList
        style={{
          marginLeft: "1em",
        }}
      >
        {subLinks.map((subLink) => {
          return (
            <MenuItem
              key={subLink.text + subLink.link}
              sx={{
                backgroundColor: path === subLink.link ? "primary.main" : "",
                color: path === subLink.link ? "white" : "",
              }}
            >
              <Link href={subLink.link}>{subLink.text}</Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Collapse>
  );
};
const Link = styled.a`
  width: 100%;
`;
export default MyCollapse;
