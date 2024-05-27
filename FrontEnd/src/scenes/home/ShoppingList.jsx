import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import "animate.css/animate.min.css";
import { useAuth } from "../../context/AuthContext";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("all"); // Inisialisasi nilai tab aktif
  const breakPoint = useMediaQuery("(min-width:600px)");
  const { API } = useAuth();

  async function getItems() {
    try {
      const response = await axios.get(`${API}/products`);
      const data = response.data.products; // Menggunakan response.data.products untuk mengakses array produk
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event, newValue) => {
    setValue(newValue); // Mengubah nilai tab aktif saat tab diubah
  };

  return (
    <Box width="80%" margin="80px auto">
      <Box width="30%" margin="0 auto">
        <Typography variant="h3" textAlign="center">
          Our Featured <b>Products</b>
        </Typography>
      </Box>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        centered
        value={value} // Menentukan tab mana yang aktif
        onChange={handleChange} // Menggunakan fungsi handleChange untuk mengubah tab aktif
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
      </Tabs>
      <Box
        margin="0 auto"
        className={`gap-20 mx-auto grid sm:grid md:grid lg:grid-cols-2 xl:grid-cols-3`} // Mengubah tampilan menjadi grid dengan 2 kolom pada layar besar dan 1 kolom pada layar kecil (sm)
        gap="20px"
      >
        {items.map((item) => (
          <Item key={item._id} item={item} width="300px" />
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
