import MenuList from "@mui/material/MenuList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import SublinksMenuItem from "./SublinksMenuItem";
import { FC } from "react";
type Props = {
  title: string;
  setCurrentTab: (tab: string) => void;
};
const Drawer: FC<Props> = ({ title, setCurrentTab }) => {
  const theme = useTheme();
  const tabs = [
    {
      text: "En attente de confirmation",
      id: "attente",
    },
    {
      text: "Commande confirmée",
      id: "confirmed",
    },
    {
      text: "Service fait",
      id: "done",
    },
  ];
  return (
    <Box bgcolor={theme.palette.grey[100]} minHeight="100vh">
      <Box padding="1rem" bgcolor={theme.palette.primary.dark}>
        <Typography
          textAlign="center"
          variant="subtitle1"
          color="white"
          component="a"
          href="/"
          display="block"
        >
          {title}
        </Typography>
      </Box>
      <MenuList>
        <SublinksMenuItem
          text="Commandes"
          tabs={tabs}
          setCurrentTab={setCurrentTab}
        />
      </MenuList>
    </Box>
  );
};

export default Drawer;
