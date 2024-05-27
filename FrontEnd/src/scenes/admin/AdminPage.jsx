import React, { useEffect, useState } from "react";
import { Alert, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import ItemAdmin from "./ItemAdmin";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const AdminPage = () => {
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi
  const { checkAdminPermission, isAdmin, loading, API } = useAuth(); // Gunakan checkAdminPermission dari useAuth

  useEffect(() => {
    if (!isAdmin) {
      checkAdminPermission(); // Gunakan checkAdminPermission untuk memeriksa apakah user adalah admin
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [items, setItems] = useState([]);

  async function getItems() {
    try {
      const response = await axios.get(`${API}/products`);
      const data = response.data.products;
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddProduct = () => {
    navigate("/admin/add-product"); // Menggunakan navigate untuk navigasi
  };

  const updateItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (isAdmin) {
    return (
      <div className="container mx-auto my-2">
        <Box className="mt-3 container flex flex-col">
          <Box className="flex flex-row justify-center mb-10 gap-3">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className=""
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className=""
              onClick={() => navigate("manage-order")}
            >
              Manage Orders
            </Button>
          </Box>
          <Box
            margin="0 auto"
            className={`gap-20 grid mx-auto sm:grid md:grid lg:grid-cols-2 xl:grid-cols-4`}
            gap="20px"
          >
            {items.map((item) => (
              <ItemAdmin key={item._id} item={item} updateItem={updateItem} />
            ))}
          </Box>
        </Box>
      </div>
    );
  } else {
    // Menampilkan pesan kesalahan
    return (
      <>
        <div className="container mx-auto my-2">
          <Box
            width="80%"
            margin="80px auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <Alert severity="error" style={{ maxWidth: "100%" }}>
              You are not authorized to access this page.
            </Alert>
            <Typography variant="h5" className="my-2">
              Redirecting to the login page...
            </Typography>
          </Box>
        </div>
        {setTimeout(() => {
          navigate("/login"); // Navigasi ke halaman login setelah sejumlah detik
        }, 2000)}
      </>
    );
  }
};

export default AdminPage;
