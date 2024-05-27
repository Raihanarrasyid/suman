// import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext.js";
import { useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "animate.css/animate.min.css";

const Item = ({ item }) => {
  const { API } = useAuth();
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/item/${item._id}`);
  };

  const handleAddToCart = () => {
    // addToCart(item._id, 1, "M");
    navigate(`/item/${item._id}`);
  };

  return (
    <Box className="mx-auto">
      <div className="card w-64 sm:w-64 md:w-72 xl:w-72 2xl:w-96 glass">
        <figure
          className="card-image relative"
          onMouseOver={(e) => {
            setHover(true);
          }}
          onMouseOut={(e) => {
            setHover(false);
          }}
          onClick={handleDetail}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`${API}${item.pictureUrl}`}
            alt="car!"
            style={{
              width: "100%",
              height: "18rem",
              objectFit: "cover",
              filter: hover ? "blur(2px)" : "none",
              transform: hover ? "scale(1.1)" : "scale(1)",
              transition: "all 0.5s",
            }}
          />
          {hover && (
            <IconButton
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "black",
                color: "white",
                zIndex: "0",
              }}
            >
              <VisibilityIcon />
            </IconButton>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title text-sm">{item.name}</h2>
          <p className="text-sm">{item.description}</p>
          <Typography fontWeight="bold" fontSize={24} className="text-sm">
            Rp. {item.price}
          </Typography>
          <div className="card-actions justify-end">
            <Button variant="contained" size="large" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Item;
