import styled from "@emotion/styled";
import { FC } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import ListItemText from "@mui/material/ListItemText";

type Props = {
  link: string;
  text: string;
};
const SimpleMenuItem: FC<Props> = ({ link, text }) => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <StyledMenuItem active={path === link ? "true" : ""} key={text}>
      <Link href={link}>
        <ListItemText>{text}</ListItemText>
      </Link>
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
const Link = styled.a`
  width: 100%;
`;
export default SimpleMenuItem;
