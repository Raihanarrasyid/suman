import { Box, Button, IconButton, Skeleton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { useAuth } from "../../context/AuthContext.js";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const { API, addToCart } = useAuth();
  const [size, setSize] = useState("");
  const name = item?.name;
  const regex = /- (.*)/;
  let match = [];

  useEffect(() => {
    if (!name) return;
    match = name.match(regex);
    if (match) {
      const dynamic = match[1];
      setSize(dynamic);
    } else {
      // Handle jika tidak ada pencocokan
      setSize(""); // Atau nilai default yang sesuai
    }
  }, [item]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSize = (event, newValue) => {
    setSize(newValue);
  };

  async function getItem() {
    const item = await axios.get(`${API}/products/${itemId}`);
    setItem(item.data.product);
  }

  async function getItems() {
    const items = await axios.get(`${API}/products`);
    const filteredItems = items.data.products.filter(
      (item) => item._id !== itemId
    );
    setItems(filteredItems);
  }

  async function handleAddToCart() {
    addToCart(item._id, count, size);
  }

  useEffect(() => {
    getItem();
    getItems();
    scroll.scrollToTop();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!item ? (
        <>
          <Box width="80%" m="80px auto">
            <Skeleton variant="rectangular" width={400} height={300} />
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={500} height={20} />
            <Skeleton variant="text" width={500} height={20} />
            <Skeleton variant="text" width={500} height={20} />
          </Box>
        </>
      ) : (
        <Box width="80%" m="80px auto">
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            {/* IMAGES */}
            <Box flex="1 1 40%" mb="40px">
              <img
                alt={item?.name}
                width="100%"
                height="100%"
                style={{ objectFit: "contain" }}
                src={`${API}${item?.pictureUrl}`}
              />
            </Box>

            {/* ACTIONS */}
            <Box flex="1 1 50%" mb="40px">
              <Box m="65px 0 25px 0">
                <Typography variant="h3">{item.name}</Typography>
                <Typography>{item.price}</Typography>
                <Typography sx={{ mt: "20px" }}>{item.description}</Typography>
              </Box>

              <Box display="flex" alignItems="center" minHeight="50px">
                <Box
                  display="flex"
                  alignItems="center"
                  border={`1.5px solid ${shades.neutral[300]}`}
                  mr="20px"
                  p="2px 5px"
                >
                  <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                  <IconButton onClick={() => setCount(count + 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  sx={{
                    backgroundColor: "#222222",
                    color: "white",
                    borderRadius: 0,
                    minWidth: "150px",
                    padding: "10px 40px",
                  }}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              </Box>
              <Box m="20px 0">
                <Tabs value={size} onChange={handleChangeSize}>
                  <Tab
                    label={<span style={{ fontSize: "16px" }}>{size}</span>}
                    value={size}
                  />
                </Tabs>
              </Box>
              <Box>
                <Box m="20px 0 5px 0" display="flex">
                  <FavoriteBorderOutlinedIcon />
                  <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                </Box>
                <Typography>CATEGORIES: Jenis Kategori</Typography>
              </Box>
            </Box>
          </Box>

          {/* INFORMATION */}
          <Box m="20px 0">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="DESCRIPTION" value="description" />
              <Tab label="REVIEWS" value="reviews" />
            </Tabs>
          </Box>
          <Box display="flex" flexWrap="wrap" gap="15px">
            {value === "description" && (
              <div style={{ flex: "1", flexGrow: "1", whiteSpace: "pre" }}>
                {item.longDescription}
              </div>
            )}
            {value === "reviews" && <div>reviews</div>}
          </Box>

          {/* RELATED ITEMS */}
          <Box mt="50px" width="100%">
            <Typography variant="h3" fontWeight="bold">
              Related Products
            </Typography>
            <Box
              mt="20px"
              display="flex"
              flexWrap="wrap"
              columnGap="1.33%"
              justifyContent="space-between"
              className="gap-5"
            >
              {items.slice(0, 4).map((item, i) => (
                <Item key={`${item.name}-${i}`} item={item} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ItemDetails;
