import { Badge, Box, Button, IconButton, Drawer, Icon } from "@mui/material";
import {
  PersonOutline,
  ShoppingCart,
  Logout,
  Menu,
  Close,
  Home,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import logo from "../../assets/logo/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import CheckroomIcon from "@mui/icons-material/Checkroom";

function Navbar() {
  const navigate = useNavigate();
  const { logout, API } = useAuth();
  const cartAmount = localStorage.getItem("cartAmount");
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getCartAmount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`${API}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const cartAmount = response.data.cart.amountOfItem;
          localStorage.setItem("cartAmount", cartAmount);
        }
      } catch (error) {
        console.error("Error getting cart amount: ", error);
      }
    } else {
      localStorage.setItem("cartAmount", 0);
    }
  };

  useEffect(() => {
    getCartAmount();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPositionToFixNavbar = 60;

      if (window.scrollY > scrollPositionToFixNavbar) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isNavbarFixed && <Box width="100%" height="60px"></Box>}
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        backgroundColor="rgba(255, 255, 255, 0.95)"
        color="black"
        position={isNavbarFixed ? "fixed" : "relative"}
        border={
          isNavbarFixed ? "1px solid rgba(0, 0, 0, 0.1)" : "1px transparent"
        }
        top="0"
        left="0"
        zIndex="1"
      >
        <Box
          width="80%"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer" } }}
            color={shades.secondary[500]}
            fontWeight="bold"
            display="flex"
            alignItems="center"
            columnGap="8px"
          >
            <img
              src={logo}
              alt="logo"
              width="30px"
              height="30px"
              style={{ borderRadius: "50%" }}
            />
            SUMAN
          </Box>
          <Box
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
            className="hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex"
          >
            {isAdmin === "true" && (
              <Button variant="contained" onClick={() => navigate("/admin")}>
                Admin Page
              </Button>
            )}
            <IconButton
              sx={{ color: "black" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <Home />
            </IconButton>
            <IconButton
              sx={{ color: "black" }}
              onClick={() => {
                navigate("/about");
              }}
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              sx={{ color: "black" }}
              onClick={() => {
                navigate("/customize");
              }}
            >
              <CheckroomIcon />
            </IconButton>
            {user && (
              <Badge
                badgeContent={cartAmount}
                color="secondary"
                invisible={cartAmount === 0 || !cartAmount}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 5,
                    top: 5,
                    padding: "0 4px",
                    height: "14px",
                    minWidth: "13px",
                  },
                }}
              >
                <IconButton
                  onClick={() => {
                    navigate("/cart");
                  }} // setIsCartOpen(true)
                  sx={{ color: "black" }}
                >
                  <ShoppingCart />
                </IconButton>
              </Badge>
            )}
            <IconButton sx={{ color: "black" }} onClick={handleProfileClick}>
              <PersonOutline />
            </IconButton>
            {user && (
              <IconButton sx={{ color: "black" }} onClick={handleLogout}>
                <Logout />
              </IconButton>
            )}
          </Box>
          <Box
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
            className="md:hidden lg:hidden xl:hiddem 2xl:hidden"
          >
            <IconButton
              sx={{ color: "black" }}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu />
            </IconButton>
          </Box>
        </Box>

        {/* Drawer for small screens */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            width="250px"
            padding="20px"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Box className="flex flex-col gap-10 w-full">
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{ alignSelf: "flex-end" }}
              >
                <Close />
              </IconButton>
              {/* Place your navigation links here */}
              <Box className="flex flex-col gap-2">
                {isAdmin === "true" && (
                  <Button
                    onClick={() => {
                      navigate("/admin");
                      setDrawerOpen(false);
                    }}
                  >
                    Admin Page
                  </Button>
                )}
                <Button
                  sx={{ marginTop: "16px" }}
                  onClick={() => {
                    navigate("/");
                    setDrawerOpen(false);
                  }}
                  className="flex-1 btn"
                >
                  Home
                </Button>
                <Button
                  sx={{ marginTop: "16px" }}
                  onClick={() => {
                    navigate("/about");
                    setDrawerOpen(false);
                  }}
                  className="flex-1 btn"
                >
                  About
                </Button>
                <Button
                  sx={{ marginTop: "16px" }}
                  onClick={() => {
                    navigate("/customize");
                    setDrawerOpen(false);
                  }}
                  className="flex-1 btn"
                >
                  Customize
                </Button>
                <Button
                  sx={{ marginTop: "16px" }}
                  onClick={() => {
                    navigate("/cart");
                    setDrawerOpen(false);
                  }}
                  className="flex-1 btn"
                >
                  Cart
                </Button>
                <Button
                  sx={{ marginTop: "16px" }}
                  onClick={() => {
                    if (token) {
                      navigate("/profile");
                    } else {
                      navigate("/login");
                    }
                    setDrawerOpen(false);
                  }}
                  className="flex-1 btn"
                >
                  {user ? "Profile" : "Login"}
                </Button>
                {user && (
                  <Button
                    sx={{ marginTop: "16px" }}
                    onClick={handleLogout}
                    className="flex-1 btn"
                  >
                    Logout
                  </Button>
                )}
              </Box>
            </Box>
            {/* Add more links as needed */}
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Navbar;
