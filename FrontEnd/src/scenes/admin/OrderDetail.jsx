import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Alert } from "@mui/material";
import { useState } from "react";
import { shades } from "../../theme";
import { Button } from "@mui/material";
import { animateScroll as scroll } from "react-scroll";

const OrderDetail = () => {
  const token = localStorage.getItem("token");
  const { API, checkAdminPermission, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const [urlFile, setUrlFile] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const getAddress = async () => {
    if (token) {
      try {
        const response = await axios.get(
          `${API}/address/admin/${order.addressId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setAddress(response.data.address);
        }
      } catch (error) {
        console.error("Error getting address: ", error);
      }
    }
  };

  const getOrder = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API}/order/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setOrder(response.data.order);
          if (
            response.data.order.paymentPicture !== "" &&
            response.data.order.paymentPicture !== null
          ) {
            setUrlFile(`${API}${response.data.order.paymentPicture}`);
          }
        }
      } catch (error) {
        console.error("Error getting order: ", error);
      }
    }
  };

  const handleDeliver = async () => {
    try {
      const response = await axios.put(
        `${API}/order/${id}`,
        {
          status: "Delivered",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getOrder();
    } catch (error) {
      console.error("Error getting order: ", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        `${API}/order/${id}`,
        {
          status: "Cancelled",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getOrder();
    } catch (error) {
      console.error("Error getting order: ", error);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      checkAdminPermission();
    }
  }, []);

  useEffect(() => {
    getOrder();
  }, []);
  useEffect(() => {
    scroll.scrollToTop({
      duration: 1000,
      smooth: "easeInOutQuart",
    });
    if (order) {
      getAddress();
    }
  }, [order]);

  if (token) {
    if (loading && !order) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error.message}</div>;
    } else if (isAdmin) {
      return (
        <>
          {!order ? (
            <Box className="mx-auto my-10 w-4/5 h-96 flex items-center justify-center">
              <Typography variant="h6" component="h2">
                Loading...
              </Typography>
            </Box>
          ) : (
            <div className="container w-3/5 mx-auto my-10 flex flex-col gap-2">
              {success ? (
                <Alert severity="success" className="fade-in-fade-out flex-1">
                  Product saved successfully! Redirecting to admin page...
                </Alert>
              ) : (
                error && (
                  <Alert severity="error" className="fade-in-fade-out">
                    {error}
                  </Alert>
                )
              )}
              <Typography variant="h4" component="h1" className="text-center">
                Payment
              </Typography>
              <div className="flex flex-col gap-2">
                <Typography variant="h6" component="h2">
                  Total Price: Rp. {order.totalPrice.toLocaleString("id-ID")}
                </Typography>

                <Box className="flex gap-2 card glass p-5">
                  <Typography variant="h6" component="h2">
                    Payment Method:
                  </Typography>
                  <Box className="flex justify-between">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png"
                      alt="BRI"
                      className="w-20"
                    />
                  </Box>
                  <p>Transfer to:</p>
                  <p>
                    <strong>0059 0115 2880 507</strong> (BRI)
                  </p>
                  <p>
                    <strong>Muhammad Aidil</strong>
                  </p>
                </Box>

                <Box className="flex flex-col md:justify-between md:flex-row">
                  <Typography variant="h6" component="h2" fontWeight={"bold"}>
                    Status: {order.status}
                  </Typography>
                  <Box className="flex flex-row gap-3">
                    <Box className="flex gap-2 items-center justify-center w-full">
                      <Button
                        variant="contained"
                        className="glass"
                        size="small"
                        onClick={handleDeliver}
                      >
                        Deliver
                      </Button>
                      <Button
                        variant="contained"
                        className="glass"
                        size="small"
                        onClick={handleReject}
                      >
                        Reject
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <Box className="flex items-center justify-center">
                  <img
                    src={urlFile}
                    alt="Payment Picture"
                    className={`w-96 h-96 object-contain`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  />
                </Box>

                <Box className="flex gap-2 card glass p-5">
                  <Typography variant="h6" component="h2">
                    Address:
                    {address && (
                      <>
                        <p className="text-md">
                          {order.name} {}
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
                      </>
                    )}
                  </Typography>
                </Box>

                <Typography variant="h6" component="h2">
                  List Product:
                </Typography>
                <div className="flex flex-col gap-2">
                  {order.listProduct.map((product) => (
                    <div
                      className="card glass sm:card-side"
                      key={`${product._id}${product.size}`}
                    >
                      <figure className="card-image relative sm:w-52">
                        <img
                          src={`${API}${product.pictureUrl}`}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      <div className="card-body">
                        <Box className="flex flex-col gap-2 md:justify-between md:flex-row">
                          <h2 className="card-title">{product.name}</h2>
                          <Typography
                            variant="h3"
                            className="card-title"
                            sx={{
                              color: shades.darkerGray,
                              fontWeight: "bold",
                            }}
                          >
                            Rp {product.price.toLocaleString("id-ID")} x{" "}
                            {product.amount}
                          </Typography>
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
                  ))}
                </div>
              </div>
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
                You are not an admin.
              </Alert>
              <Typography variant="h5" className="my-2">
                Redirecting to the home page...
              </Typography>
            </Box>
          </div>
          {setTimeout(() => {
            navigate("/"); // Navigasi ke halaman login setelah sejumlah detik
          }, 2000)}
        </>
      );
    }
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

export default OrderDetail;
