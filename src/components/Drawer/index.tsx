import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
const Drawer = () => {
  const theme = useTheme();
  const router = useRouter();
  const path = router.asPath;
  const items = [
    {
      text: "Mes services",
      link: "/",
    },
    {
      text: "Mes sites",
      link: "/sites",
    },
    {
      text: "Mes commandes",
      link: "/commandes",
    },
  ];
  return (
    <Box bgcolor={theme.palette.grey[100]} minHeight="100vh">
      <Box padding="1rem" bgcolor={theme.palette.primary.dark}>
        <Typography textAlign="center" variant="subtitle1" color="white">
          DASHBOARD
        </Typography>
      </Box>
      <MenuList>
        {items.map((item) => {
          return (
            <StyledMenuItem
              active={path === item.link ? "true" : ""}
              key={item.text}
            >
              <Link href={item.link}>
                <ListItemText>{item.text}</ListItemText>
              </Link>
            </StyledMenuItem>
          );
        })}
      </MenuList>
    </Box>
  );
};
const Link = styled.a`
  width: 100%;
`;
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
export default Drawer;
