import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import styled from "@emotion/styled";
const Drawer = () => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.grey[100]} minHeight="100vh">
      <Box padding="1rem" bgcolor={theme.palette.primary.dark}>
        <Typography textAlign="center" variant="subtitle1" color="white">
          DASHBOARD
        </Typography>
      </Box>
      <MenuList>
        <MenuItem>
          <Link href="/">
            <ListItemText>Mes services</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/sites">
            <ListItemText>Mes sites</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/commandes">
            <ListItemText>Mes commandes</ListItemText>
          </Link>
        </MenuItem>
      </MenuList>
    </Box>
  );
};
const Link = styled.a`
  width: 100%;
`;
export default Drawer;
