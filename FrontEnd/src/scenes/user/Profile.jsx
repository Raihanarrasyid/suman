import { Box, Button, Typography } from "@mui/material";
import { shades } from "../../theme";
import { useAuth } from "../../context/AuthContext.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { animateScroll as scroll } from "react-scroll";

const Profile = () => {
  const { API } = useAuth();
  const [orders, setOrders] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(`${API}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API}/order/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error getting orders: ", error);
    }
  };

  const getAddress = async () => {
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
  };

  useEffect(() => {
    getUser();
    getOrders();
    getAddress();
    scroll.scrollToTop({
      duration: 1000,
      smooth: "easeInOutQuart",
    });
  }, []);
  if (token) {
    return (
      <>
        {user ? (
          <Box className="container w-4/5 mx-auto my-10">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Your Profile
            </Typography>

            <Box className="flex flex-col gap-5 mt-5">
              <Box className="flex flex-col gap-2 card glass rounded-lg p-5">
                <Box className="flex gap-2 items-center">
                  <Typography variant="h6">Name :</Typography>
                  <Typography variant="body1">{user.name}</Typography>
                </Box>
                <Box className="flex gap-2 items-center">
                  <Typography variant="h6">Email :</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
                {address ? (
                  <>
                    <Box className="flex gap-2 items-center">
                      <Typography variant="h6">Phone :</Typography>
                      <Typography variant="body1">
                        {address.detailAddress.phoneNumber}
                      </Typography>
                    </Box>
                    <Box className="flex flex-col gap-2">
                      <Typography variant="h6">Address :</Typography>
                      <p>
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
                    </Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      className="w-1/2"
                      onClick={() => {
                        navigate("/address");
                      }}
                    >
                      Add Address
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate("/address");
                    }}
                  >
                    Add Address
                  </Button>
                )}
              </Box>
              <Box className="flex flex-col gap-2">
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  My Order :
                </Typography>
                {orders && orders.length !== 0 ? (
                  orders.map((order) => {
                    return (
                      <div
                        className="card glass sm:card-side"
                        key={`${order._id}${order.createdAt}`}
                      >
                        <div className="card-body">
                          <p>Ordered By: {order.name}</p>
                          <p>
                            Total: {order.totalPrice.toLocaleString("id-ID")}
                          </p>
                          <p
                            style={{
                              color: shades.darkerGray,
                              fontWeight: "bold",
                              fontSize: "17px",
                            }}
                          >
                            Status: "{order.status}"
                          </p>
                          <p
                            style={{
                              color: shades.darkerGray,
                            }}
                          >
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <button
                            className="btn btn-sm"
                            style={{ color: "white" }}
                            onClick={() => {
                              navigate(`/payment/${order._id}`);
                            }}
                          >
                            Detail
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Typography variant="body1">No Order Found</Typography>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">Loading...</Typography>
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

export default Profile;
