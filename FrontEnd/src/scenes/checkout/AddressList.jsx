import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const AddressList = () => {
  const [addresses, setAddresses] = useState(null);
  const [mainAddress, setMainAddress] = useState({});
  const { API } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getMainAddress = async () => {
    if (token) {
      try {
        const response = await axios.get(`${API}/address/main`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setMainAddress(response.data.address);
        }
      } catch (error) {
        console.error("Error getting main address: ", error);
      }
    }
  };

  const handleSetMainAddress = async (id) => {
    if (token) {
      try {
        const response = await axios.put(
          `${API}/address/setMain/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          getAddresses();
          getMainAddress();
        }
      } catch (error) {
        console.error("Error setting main address: ", error);
      }
    }
  };

  const handleDeleteAddress = async (id) => {
    if (token) {
      try {
        const response = await axios.delete(`${API}/address/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          getAddresses();
        }
      } catch (error) {
        console.error("Error deleting address: ", error);
      }
    }
  };

  async function getAddresses() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`${API}/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAddresses(response.data.addresses);
        }
      } catch (error) {
        console.error("Error getting addresses: ", error);
      }
    }
  }
  useEffect(() => {
    getMainAddress();
    getAddresses();
  }, []);
  if (token) {
    return (
      <>
        {!addresses ? (
          <Box className="mx-auto my-10 w-4/5 h-96 flex items-center justify-center">
            <Typography variant="h6" component="h2">
              Loading...
            </Typography>
          </Box>
        ) : (
          <Box>
            {addresses.length === 0 ? (
              <Box className="mx-auto my-10 w-4/5 h-96 flex items-center justify-center">
                <Box
                  className="flex flex-col gap-5"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    className="text-center"
                  >
                    You have not added any addresses yet.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate("add");
                    }}
                  >
                    <Typography variant="h6" component="h2">
                      Add Address
                    </Typography>
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box className="mx-auto my-10 w-4/5">
                <Typography variant="h6" component="h2">
                  Your addresses
                </Typography>
                <Box className="mx-auto my-10 flex flex-col gap-5">
                  {addresses.map((address) => {
                    return (
                      <Box
                        className="flex flex-col gap-1 card glass p-5"
                        key={address._id}
                        sx={{ whiteSpace: "pre" }}
                      >
                        <Typography
                          variant="h3"
                          component="h2"
                          sx={{ fontWeight: "normal" }}
                        >
                          {address.detailAddress.firstName}{" "}
                          {address.detailAddress.lastName}
                          {"   |  "}
                          {address.detailAddress.phoneNumber}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{ fontWeight: "normal" }}
                        >
                          {address.detailAddress.city},{" "}
                          {address.detailAddress.state},{" "}
                          {address.detailAddress.country}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{ fontWeight: "normal" }}
                        >
                          {address.detailAddress.street1},{" "}
                          {address.detailAddress.zipCode}
                        </Typography>
                        <Box className="flex justify-end gap-1">
                          {address._id === mainAddress._id ? (
                            <></>
                          ) : (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={handleSetMainAddress.bind(
                                this,
                                address._id
                              )}
                            >
                              Set as Main Address
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteAddress.bind(
                              this,
                              address._id
                            )}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("add");
                  }}
                >
                  <Typography variant="h6" component="h2">
                    Add Address
                  </Typography>
                </Button>
              </Box>
            )}
          </Box>
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

export default AddressList;
