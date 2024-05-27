import { Box, Tab, Tabs, Typography, Button } from "@mui/material";
import clothes from "../../assets/custom/round-neck-tshirt-mockup.png";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets/history", false, /\.(png|jpe?g|svg)$/)
);

const Customize = () => {
  const [motif, setMotif] = useState("Papan");
  const [size, setSize] = useState("M");
  const [code, setCode] = useState("1");
  const [linkImage, setLinkImage] = useState(null);
  const { API } = useAuth();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const orientation = isSmallScreen ? "vertical" : "";
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [linkNavigation, setLinkNavigation] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate(linkNavigation);
  };

  const handleCloseError = () => {
    setError(false);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleChangeMotif = (event, value) => {
    setMotif(value);
  };

  const handleChangeSize = (event, value) => {
    setSize(value);
  };

  const handleChangeCode = (event, value) => {
    setCode(value);
  };

  const handleGenerate = async () => {
    try {
      const response = await axios.post(`${API}/products/category`, {
        motif,
        size,
        code,
      });
      scroll.scrollToTop({
        duration: 500,
        smooth: "easeInOutQuart",
      });
      if (response.data.products.length === 0) {
        setError(true);
        return;
      }
      setLinkNavigation(`/item/${response.data.products[0]._id}`);
      setLinkImage(`${API}${response.data.products[0].pictureUrl}`);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mt="20px">
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        fontSize="2rem"
      >
        Customize
      </Typography>
      <Box width="80%" m="30px auto">
        <Box className="flex flex-wrap" columnGap="40px">
          <Box flex="1 1 40%" mb="40px">
            <img
              src={linkImage ? linkImage : clothes}
              alt="black t-shirt"
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box
            flex="1 1 50%"
            className="flex flex-col justify-between gap-10"
            mb="40px"
          >
            <Box className="flex flex-col gap-5">
              <Box className="w-4/5">
                <Typography variant="h5" fontWeight="bold">
                  Motif
                </Typography>
                <Tabs
                  value={motif}
                  onChange={handleChangeMotif}
                  orientation={orientation}
                >
                  <Tab
                    label={
                      <Box>
                        <img
                          src={heroTextureImports["Papan.png"]}
                          alt="Papan"
                          className="w-20"
                        />
                        <Typography>Papan</Typography>
                      </Box>
                    }
                    value="Papan"
                  />
                  <Tab
                    label={
                      <Box>
                        <img
                          src={heroTextureImports["Angso Belago.png"]}
                          className="w-20"
                          alt="Angso Belago"
                        />
                        <Typography>Angso Belago</Typography>
                      </Box>
                    }
                    value="Angso Belago"
                  />
                  <Tab
                    label={
                      <Box>
                        <img
                          src={heroTextureImports["Biji Pala.png"]}
                          className="w-20"
                          alt="Biji Pala"
                        />
                        <Typography>Biji Pala</Typography>
                      </Box>
                    }
                    value="Biji Pala"
                  />
                  <Tab
                    label={
                      <Box>
                        <img
                          src={heroTextureImports["Singkok Jala.png"]}
                          className="w-20"
                          alt="Singkok Jala"
                        />
                        <Typography>Singkok Jala</Typography>
                      </Box>
                    }
                    value="Singkok Jala"
                  />
                </Tabs>
              </Box>

              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Code
                </Typography>
                <Tabs value={code} onChange={handleChangeCode}>
                  <Tab label="1" value="1" />
                  <Tab label="2" value="2" />
                  <Tab label="3" value="3" />
                  <Tab label="4" value="4" />
                </Tabs>
              </Box>

              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Size
                </Typography>
                <Tabs value={size} onChange={handleChangeSize}>
                  <Tab label="M" value="M" />
                  <Tab label="L" value="L" />
                  <Tab label="XL" value="XL" />
                </Tabs>
              </Box>
            </Box>
            <Box
              mt="20px"
              className="flex gap-5 justify-center md:justify-start"
            >
              <Button variant="contained" size="large" onClick={handleGenerate}>
                Generate
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                disabled={linkNavigation === null}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={error}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert severity="error" elevation={6} variant="filled">
          This item is not ready
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert severity="success" elevation={6} variant="filled">
          Generating...
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Customize;
