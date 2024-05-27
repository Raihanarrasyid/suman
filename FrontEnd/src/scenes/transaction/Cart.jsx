import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
import { useAuth } from "../../context/AuthContext.js";
import axios from "axios";
import CartItem from "./CartItem.jsx";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Cart = () => {
  const { API } = useAuth();
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(cart?.totalPrice);

  const token = localStorage.getItem("token");

  const getCart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setCart(response.data.cart);
            setTotalPrice(response.data.cart.totalPrice);
          }
        })
        .catch((error) => {
          console.error("Error getting cart: ", error);
        });
    }
  };

  const updateCartItem = (itemId, size, newAmount) => {
    const index = cart.products.findIndex(
      (product) => product.product === itemId && product.size === size
    );

    if (index !== -1) {
      cart.products[index].amount = newAmount;
    }
    setTotalPrice(calculateTotalPrice(cart.products));
  };

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0);
  };

  const updateItem = (itemId, size) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.filter(
        (item) => item.product !== itemId || item.size !== size
      );

      const updatedTotalPrice = calculateTotalPrice(updatedProducts);

      const updatedCart = {
        ...prevCart,
        products: updatedProducts,
        totalPrice: updatedTotalPrice,
      };
      setTotalPrice(calculateTotalPrice(cart.products));
      return updatedCart;
    });
  };

  useEffect(() => {
    getCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (token) {
    return (
      <div className="cart">
        {!cart ? (
          <Box>Loading</Box>
        ) : (
          <Box>
            {cart.products.length === 0 ? (
              <Box className="h-96 flex justify-center items-center container mx-auto mt-5">
                <Typography variant="h6" color={shades.darkerGray}>
                  Your cart is empty
                </Typography>
              </Box>
            ) : (
              <>
                <Box className="mx-auto flex flex-col gap-10 md:flex-row justify-between items-center my-10 w-4/6">
                  <h1
                    variant="h4"
                    color={shades.darkerGray}
                    fontWeight={"bold"}
                    className="text-2xl font-bold text-gray-800 border-2 border-gray-800 rounded-lg px-4 py-2 mb-4 md:mb-0"
                  >
                    Cart
                  </h1>
                  <Box className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-10">
                    <h1
                      variant="h4"
                      color={shades.darkerGray}
                      fontWeight={"bold"}
                      className="text-xl md:text-2xl"
                    >
                      Total: Rp {totalPrice ? totalPrice : 0}
                    </h1>
                    <Button
                      variant="contained"
                      color="primary"
                      className="btn btn-md inline-flex mt-4 md:mt-0"
                      onClick={() => {
                        navigate("/checkout");
                      }}
                    >
                      Checkout
                    </Button>
                  </Box>
                </Box>

                <Box className="flex flex-col gap-4">
                  {cart.products.map((item) => (
                    <CartItem
                      key={`${item.product}${item.size}`}
                      item={item}
                      cart={cart}
                      updateItem={updateItem}
                      updateCartItem={updateCartItem}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        )}
      </div>
    );
  } else {
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
              You are not logged in.
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

export default Cart;
