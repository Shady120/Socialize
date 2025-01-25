import * as React from 'react';
import logo from "@/assests/S Logo.png";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
 
  MenuItem,
  Menu,
  Button,
  useColorScheme,
  Backdrop,
  CircularProgress,
  Avatar
} from '@mui/material';

import {
  MoreVert as MoreIcon,
  Logout as LogoutIcon,
  DarkMode,
  LightMode,
  AppRegistrationRounded,
  Login
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from '../lib/Slice';
import { stateStore } from '../lib/store';
import { usePathname, useRouter } from 'next/navigation';
import nookies from "nookies";

import axios from 'axios';



export default function PrimarySearchAppBar() {
      const [img, setImg] = React.useState("");
      const router = useRouter();
      const pathName = usePathname()
      React.useEffect(() => {
        if (pathName === "/" || "/SinglePost" || "/Comments"||"/Profile") {
          getUserData("");
        }
      }, [pathName]);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(clearData());
  }

 

  const { token } = useSelector((state: stateStore) => state.auth);
  const { mode, setMode } = useColorScheme();

  function toggle() {
    setMode(mode === "dark" ? "light" : "dark");
  }
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {token
        ? [
            //Profile icon
            <MenuItem
              onClick={() => {
                getUserData("click");
                handleMobileMenuClose()
              }}
              key="profile"
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                color="inherit"
              >
                <Avatar
                  alt="Shady Sherif"
                  src={img}
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
              <p>Profile</p>
            </MenuItem>,
            //Logout button
            <Link href="/Login" key="logout" onClick={handleLogout}>
              <MenuItem>
                <IconButton size="large" aria-label="Logout" color="inherit">
                  <LogoutIcon />
                </IconButton>
                <p>Logout</p>
              </MenuItem>
            </Link>,
          ]
        : [
            <Link href="/Login" key="login" onClick={handleMobileMenuClose}>
              <MenuItem>
                <IconButton size="large" aria-label="Login" color="inherit">
                  <Login />
                </IconButton>
                <p>Login</p>
              </MenuItem>
            </Link>,
            <Link href="/Signup" key="register" onClick={handleMobileMenuClose}>
              <MenuItem>
                <IconButton size="large" aria-label="Register" color="inherit">
                  <AppRegistrationRounded />
                </IconButton>
                <p>Register</p>
              </MenuItem>
            </Link>,
          ]}
    </Menu>
  );
    const [open, setOpen] = React.useState(false);

  function getUserData(click:string) {
    if (click == "click") {
      setOpen(true)
    } 
    axios
      .get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: { token: nookies.get(null, "token").token },
      })
      .then((res) => {
        setImg(res.data.user.photo);
        if (click == "click") {
          setOpen(false);
          handelProfile(res.data.user._id);
        } else {
          setImg(res.data.user.photo);
        }
      })
      .catch((errror) => {
        console.log(errror);
        return <h1>Errrror in server</h1>;
      });
  }

   function handelProfile(IdUser: string) {
     router.push(`/Profile/${IdUser}`);
   }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image src={logo} alt={"image"} width={80} height={80} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                alignItems: "center",
                gap: "10px",
              },
            }}
          >
            {token ? (
              <>
                

                <IconButton
                  onClick={toggle}
                  size="large"
                  edge="end"
                  aria-label="Light Mode"
                  aria-haspopup="true"
                  color="inherit"
                >
                  {mode === "light" ? <LightMode /> : <DarkMode />}
                </IconButton>

                <IconButton
                  onClick={()=>{getUserData("click")}}
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  color="inherit"
                >
                  <Avatar
                    alt="Shady Sherif"
                    src={img}
                    sx={{ width: 24, height: 24 }}
                  />
                </IconButton>

                <Link href="/Login" onClick={handleLogout}>
                  <Button
                    sx={{
                      color: "white",
                      ":hover": { color: "blue", background: "none" },
                    }}
                  >
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <IconButton
                  onClick={toggle}
                  size="large"
                  edge="end"
                  aria-label="Light Mode"
                  aria-haspopup="true"
                  color="inherit"
                >
                  {mode === "light" ? <LightMode /> : <DarkMode />}
                </IconButton>
                <Link href="/Login">
                  <Button
                    sx={{
                      color: "white",
                      "&:hover": { color: "blue", background: "none" },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/Signup">
                  <Button
                    sx={{
                      color: "white",
                      ":hover": { color: "blue", background: "none" },
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
           

            <IconButton
              onClick={toggle}
              size="large"
              edge="end"
              aria-label="Light Mode"
              aria-haspopup="true"
              color="inherit"
            >
              {mode === "light" ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
