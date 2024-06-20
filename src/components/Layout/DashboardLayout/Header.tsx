// Header.tsx
"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import navigation from "@/constants/navigation";
import { usePathname } from "next/navigation";
import { doLogout } from "@/lib/doLogout";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = React.useState<Boolean>(false);

  const pathname = usePathname()
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const isActive = (href: string) => {
    return pathname === href ? true : false;
  };

  const handleLogout = async () => {
    const deleteServer = await doLogout()
    if (deleteServer.data) {
      signOut()
    }
  }
  

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        background: "transparent",
        p: {
          xs: 0,
          md: openMenu ? 0 : 2,
          lg: 5,
        },
        position: {
          xs: openMenu ? "absolute" : "static",
          lg: "static",
        },
      }}
    >
      <Toolbar
        className={`justify-between ${
          openMenu ? "!backdrop-blur-lg" : "!backdrop-blur-sm"
        } shadow-sm`}
        sx={{
          background: {
            xs: openMenu ? "white" : "transparent",
            lg: "white",
          },
          borderRadius: 3,
          overflow: "hidden",
          alignItems: {
            xs: openMenu ? "start" : "stretch",
            lg: "center",
          },
          height: {
            xs: openMenu ? "100vh" : 80,
            lg: 80,
          },
        }}
      >
        <div className="flex flex-col lg:!flex-row lg:items-center items-start space-x-4">
          <div className="flex aspect-square w-24 h-24">
            <Image
              src="/icons/logo-square.svg"
              alt="logo-square"
              width={500}
              height={500}
            />
          </div>
          {navigation.map((nav) => (
            <Button
              key={nav.id}
              href={nav.href}
              variant={isActive(nav.href) ? "contained" : "text"}
            >
              {nav.title}
            </Button>
          ))}
          {/* Add more menus as needed */}
        </div>
        <div className="flex gap-4 relative">
          <div>
            <IconButton
              size="large"
              edge="end"
              color="primary"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div>
            <IconButton
              onClick={toggleMenu}
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 60,
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: 10,
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
