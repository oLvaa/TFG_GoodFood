import * as React from "react";
import Link from "next/link";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ListItemButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SendIcon from "@mui/icons-material/Send";
import DiscountIcon from "@mui/icons-material/Discount";

const drawerWidth = 240;

const PRIMERA_PARTE = [
  {
    text: "Inicio",
    icon: <EqualizerIcon />,
    url: "inicio",
  },
  {
    text: "Platos",
    icon: <DinnerDiningIcon />,
    url: "platos",
  },
  {
    text: "Pedidos",
    icon: <ShoppingBasketIcon />,
    url: "pedidos",
  },
  {
    text: "Soporte",
    icon: <SendIcon />,
    url: "soporte",
  },
  {
    text: "Descuentos",
    icon: <DiscountIcon />,
    url: "descuentos",
  },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerRight({ handleDrawerState }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    handleDrawerState();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    handleDrawerState();
  };

  return (
    <Box>
      <CssBaseline />
      <Toolbar>
        <div className="z-10">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            zIndex: 1,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div className="w-full">
            <Link href="/dashboard/inicio">
              <a>
                <img src="/logo.svg" alt="Logo" width={120} />
              </a>
            </Link>
          </div>
          <IconButton onClick={handleDrawerClose}>
            <ArrowBackIosIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </DrawerHeader>

        <div className="h-full flex flex-col justify-center ">
          <List>
            {PRIMERA_PARTE.map((item) => (
              <Link href={`/dashboard/${item.url}`}>
                <a>
                  <ListItemButton
                    key={item.text}
                    sx={{
                      minHeight: 70,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </a>
              </Link>
            ))}
          </List>
        </div>
        <div className="flex justify-center w-full p-8">
          <div>
            <a href="/">
              <LogoutIcon sx={{ color: red[600] }} />
            </a>
          </div>
        </div>
      </Drawer>
    </Box>
  );
}
