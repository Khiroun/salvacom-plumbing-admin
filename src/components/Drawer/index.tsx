import MenuList from "@mui/material/MenuList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import SublinksMenuItem from "./SublinksMenuItem";
import SimpleMenuItem from "./SimpleMenuItem";
const Drawer = () => {
  const theme = useTheme();
  const items = [
    {
      text: "Mes services",
      link: "/",
    },
    {
      text: "Mes ouvriers",
      link: "/ouvriers",
      subLinks: [
        {
          text: "Ajouter un ouvrier",
          link: "/ouvriers/add",
        },
        {
          text: "Liste des ouvriers",
          link: "/ouvriers",
        },
      ],
    },

    {
      text: "Mes sites",
      link: "/sites",
    },
    {
      text: "Mes commandes",
      link: "/commandes",
      subLinks: [
        {
          text: "Réception",
          link: "/commandes",
        },
        {
          text: "En attente de confirmation",
          link: "/commandes/attente",
        },
        {
          text: "Commande confirmée",
          link: "/commandes/confirmed",
        },
        {
          text: "Service fait",
          link: "/commandes/done",
        },
        {
          text: "Archives",
          link: "/commandes/archived",
        },
      ],
    },
    {
      text: "Configuration du site",
      link: "/settings",
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
          DASHBOARD
        </Typography>
      </Box>
      <MenuList>
        {items.map((item) => {
          return item.subLinks ? (
            <SublinksMenuItem
              link={item.link}
              text={item.text}
              subLinks={item.subLinks}
              key={item.text}
            />
          ) : (
            <SimpleMenuItem link={item.link} text={item.text} key={item.text} />
          );
        })}
      </MenuList>
    </Box>
  );
};

export default Drawer;
