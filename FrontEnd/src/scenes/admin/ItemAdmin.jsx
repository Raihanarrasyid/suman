// import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemAdmin = ({ item, updateItem }) => {
  const { API } = useAuth();
  const navigate = useNavigate();
  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(`${API}/admin/product/${item._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        updateItem(item._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProduct = async () => {
    navigate(`/admin/edit/${item._id}`)
  }
  return (
    <Box className="mx-auto">
      <div className="card w-64 sm:w-64 md:w-72 xl:w-72 2xl:w-80 glass">
        <figure>
          <img
            src={`${API}${item.pictureUrl}`}
            alt="car!"
            style={{ width: "100%", height: "18rem", objectFit: "cover" }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-sm">{item.name}</h2>
          <p className="text-sm">{item.description}</p>
          <Typography fontWeight="bold" fontSize={24} className="text-sm">
            Rp. {item.price}
          </Typography>
          <div className="flex w-full gap-3">
            <button 
              className="btn btn-info btn-sm flex-1"
              onClick={handleEditProduct}
            >
              Edit
            </button>
            <button
              className="btn btn-error btn-sm flex-1"
              onClick={handleDeleteProduct}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ItemAdmin;
