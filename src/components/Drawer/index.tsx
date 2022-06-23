import MUIDrawer from "@mui/material/Drawer";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
const Drawer = () => {
  return (
    <Box>
      <MenuList>
        <MenuItem>
          <ListItemText>Mes services</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default Drawer;
