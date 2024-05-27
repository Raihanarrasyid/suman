import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Button from "@mui/material/Button";

const ItemCart = ({ item, cart, updateItem, updateCartItem }) => {
  const [count, setCount] = useState(item.amount);
  const { API, getCartAmount } = useAuth();

  const postCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          `${API}/cart/edit`,
          {
            products: cart.products, // Menggunakan cart.products langsung
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          await getCartAmount();
        }
      } catch (error) {
        console.error("Error posting cart: ", error);
      }
    }
  };

  const handleIncreaseCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    // Memanggil fungsi updateCartItem dengan argumen yang sesuai
    // updateCartItem(item.product, item.size, newCount);
  };

  const handleDecreaseCount = () => {
    const newCount = Math.max(count - 1, 0);
    setCount(newCount);
    // Memanggil fungsi updateCartItem dengan argumen yang sesuai
    // updateCartItem(item.product, item.size, newCount);
  };

  const handleDeleteProducts = async () => {
    // Cari indeks produk yang sesuai dalam cart.products
    const index = cart.products.findIndex(
      (product) =>
        product.product === item.product && product.size === item.size
    );

    if (index !== -1) {
      // Hapus produk dari cart.products
      cart.products.splice(index, 1);

      // Panggil fungsi updateItem untuk menghapus produk
      updateItem(item.product, item.size);

      // Simpan perubahan ke keranjang
      await postCart();

      // Panggil fungsi getCartAmount untuk memperbarui jumlah keranjang
      await getCartAmount();
    }
  };

  const handleEditProducts = async () => {
    const index = cart.products.findIndex(
      (product) =>
        product.product === item.product && product.size === item.size
    );
    updateCartItem(item.product, item.size, count);
    if (index !== -1 && count !== 0) {
      // Edit jumlah produk langsung pada cart.products
      cart.products[index].amount = count;
      await postCart();
      await getCartAmount();
    } else if (index !== -1 && count === 0) {
      // Hapus produk dari cart.products jika jumlah 0
      cart.products.splice(index, 1);

      // Panggil fungsi updateItem untuk menghapus produk
      updateItem(item.product, item.size);

      // Simpan perubahan ke keranjang
      await postCart();

      // Panggil fungsi getCartAmount untuk memperbarui jumlah keranjang
      return await getCartAmount();
    } else {
      // Tambahkan produk baru ke cart.products
      cart.products.push({
        pictureUrl: item.pictureUrl,
        name: item.name,
        description: item.description,
        product: item.product,
        amount: count,
        price: item.price,
        size: item.size,
      });

      // Simpan perubahan ke keranjang

      await postCart();

      // Panggil fungsi getCartAmount untuk memperbarui jumlah keranjang
      await getCartAmount();
    }
  };

  return (
    <>
      <Box className="mx-auto w-4/6">
        <div className="card glass sm:card-side">
          <figure className="card-image relative sm:w-52">
            <img
              src={`${API}${item.pictureUrl}`}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <Box className="flex justify-between">
              <h2 className="card-title">{item.name}</h2>
              <Typography
                variant="h3"
                className="card-title"
                sx={{ color: shades.darkerGray, fontWeight: "bold" }}
              >
                Rp {item.price.toLocaleString("id-ID")}
              </Typography>
            </Box>
            <p>{item.description}</p>
            <p
              style={{
                color: shades.darkerGray,
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              {item.size}
            </p>
            <Box display="flex" alignItems="center" minHeight="50px">
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                mr="20px"
                p="2px 5px"
              >
                <IconButton onClick={handleDecreaseCount}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                <IconButton onClick={handleIncreaseCount}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <div className="flex w-full flex-col gap-2 md:hidden">
              <Button
                variant="contained"
                color="error"
                className="btn-sm inline-flex"
                onClick={handleDeleteProducts}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                color="success"
                className="btn-sm inline-flex"
                onClick={handleEditProducts}
              >
                Save
              </Button>
            </div>

            <Box className="card-actions justify-end">
              <div className="card-actions justify-end hidden md:inline-flex">
                <Button
                  variant="contained"
                  color="error"
                  className="btn-md"
                  onClick={handleDeleteProducts}
                >
                  Remove
                </Button>
              </div>
              <div className="card-actions justify-end hidden md:inline-flex">
                <Button
                  variant="contained"
                  color="success"
                  className="btn-md"
                  onClick={handleEditProducts}
                >
                  Save
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ItemCart;
