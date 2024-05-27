import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { checkAdminPermission, isAdmin, loading, API } = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.orders;
      setOrders(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    checkAdminPermission();
    getOrders();
  }, []);

  if (token) {
    if (loading && !orders) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error.message}</div>;
    } else if (isAdmin && orders) {
      return (
        <>
          <Box display="flex" className="flex-col gap-3">
            <Typography variant="h2" className="text-center">
              Manage Orders
            </Typography>
            {orders.map((order) => {
              return (
                <Box
                  key={order._id}
                  className="card glass w-3/5 mx-auto card-side"
                >
                  <Box className="card-body gap-1">
                    <Typography variant="h6">
                      Ordered at :{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                    <Typography variant="h6">User : {order.name}</Typography>
                    <Typography variant="h6">
                      Total: Rp. {order.totalPrice.toLocaleString("id-ID")}
                    </Typography>
                    <Typography variant="h6">Status: {order.status}</Typography>
                    <Box className="flex justify-end items-end">
                      <button
                        className="btn btn-sm"
                        style={{ color: "white" }}
                        onClick={() => {
                          navigate(`/admin/manage-order/${order._id}`);
                        }}
                      >
                        Detail
                      </button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
            <Box className="flex justify-center">
              <Typography variant="h6">
                You can only change the status of the order.
              </Typography>
            </Box>
          </Box>
        </>
      );
    } else if (!isAdmin) {
      return (
        <>
          <Typography variant="h6" className="text-center">
            You are not authorized to view this page.
          </Typography>
          {setTimeout(() => {
            navigate("/login"); // Navigasi ke halaman login setelah sejumlah detik
          }, 2000)}
        </>
      );
    }
  } else {
    return (
      <>
        <Typography variant="h6" className="text-center">
          You are not authorized to view this page.
        </Typography>
        {setTimeout(() => {
          navigate("/login"); // Navigasi ke halaman login setelah sejumlah detik
        }, 2000)}
      </>
    );
  }
};

export default ManageOrder;
