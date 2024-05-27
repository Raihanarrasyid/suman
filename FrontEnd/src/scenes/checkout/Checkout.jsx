import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { shades } from "../../theme";

const Checkout = () => {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState(null);
  const { API } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${API}/order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Checkout success");
        localStorage.setItem("cartAmount", 0);
      }
      setTimeout(() => {
        navigate(`/payment/${response.data.order._id}`);
      }, 1000);
    } catch (error) {
      console.error("Error checking out: ", error);
    }
  };

  const getCart = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setCart(response.data.cart);
          setProducts(response.data.cart.products);
        }
      } catch (error) {
        console.error("Error getting cart: ", error);
      }
    }
  };

  const getAddress = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API}/address/main`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAddress(response.data.address);
        }
      } catch (error) {
        console.error("Error getting address: ", error);
      }
    }
  };

  useEffect(() => {
    getAddress();
    getCart();
  }, []);
  if (token) {
    return (
      <>
        {!cart ? (
          <Box className="mx-auto my-10 w-4/5 h-96 flex items-center justify-center">
            <Typography variant="h6" component="h2">
              Loading...
            </Typography>
          </Box>
        ) : (
          <div className="container mx-auto my-10 flex gap-2">
            <Box className="flex justify-evenly grow-[11]">
              <Box className="w-full flex flex-col gap-2">
                {products.map((product) => (
                  <Box key={`${product.product}${product.size}`}>
                    <div className="card glass sm:card-side">
                      <figure className="card-image relative sm:w-52">
                        <img
                          src={`${API}${product.pictureUrl}`}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      <div className="card-body">
                        <Box className="flex justify-between">
                          <h2 className="flex-1 text-sm card-title">
                            {product.name}
                          </h2>
                          <Box className="flex flex-end">
                            <p className="card-title text-sm">
                              Rp {product.price.toLocaleString("id-ID")} x{" "}
                              {product.amount}
                            </p>
                          </Box>
                        </Box>
                        <p>{product.description}</p>
                        <p
                          style={{
                            color: shades.darkerGray,
                            fontWeight: "bold",
                            fontSize: "17px",
                          }}
                        >
                          {product.size}
                        </p>
                      </div>
                    </div>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="flex flex-col grow-[1] gap-1">
              <Box className="card glass shadow-lg p-5 flex">
                <p className="text-sm">
                  Total Price: Rp {cart.totalPrice.toLocaleString("id-ID")}
                </p>
                <p className="text-sm">
                  Total Item{cart.amountOfItem > 1 ? "s" : " "}:{" "}
                  {cart.amountOfItem}
                </p>
              </Box>
              <Box className="card glass shadow-lg p-5 flex gap-2 flex-col">
                <h1 className="text-lg">Address</h1>
                {address ? (
                  <>
                    <p className="text-md">
                      {address.detailAddress.firstName}{" "}
                      {address.detailAddress.lastName}
                    </p>
                    <p>
                      {address.detailAddress.city},{" "}
                      {address.detailAddress.state},{" "}
                      {address.detailAddress.country}
                    </p>
                    <p>
                      {address.detailAddress.phoneNumber},{" "}
                      {address.detailAddress.zipCode}
                    </p>
                    <Box className="flex items-center justify-center">
                      <Button
                        className="w-1/2 mx-auto"
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => navigate("/address")}
                      >
                        Change Address
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box className="flex flex-col gap-2">
                    <p className="text-md">You don't have any address</p>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate("/address/add")}
                    >
                      Add Address
                    </Button>
                  </Box>
                )}
              </Box>
              <Box className="card glass shadow-lg p-5 flex gap-2 flex-col">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleCheckout}
                  disabled={!address}
                >
                  Checkout
                </Button>
              </Box>
            </Box>
          </div>
        )}
      </>
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

export default Checkout;
