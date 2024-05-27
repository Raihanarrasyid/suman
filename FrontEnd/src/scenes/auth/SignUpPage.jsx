import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.js";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { API } = useAuth();
  useEffect(() => {
    // Check if user is authenticated (has a token)
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to the home page if authenticated
      navigate("/");
    }
  }, [navigate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API}/auth/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setSuccess(true);
        setError("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400) {
        // Handle error code 400 (Bad Request)
        setSuccess(false);
        setError("That Email address is already registered."); 
       
      } else if (statusCode === 500) {
        // Handle error code 500 (Internal Server Error)
        setSuccess(false);
        setError("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="signUpPage my-10">
      <div className="signUpContainer">
        <Box
          minWidth="max-content"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            margin: "auto",
            rowGap: "20px",
            padding: "20px",
            border: "2px solid black",
            borderRadius: "5px",
          }}
        >
          {success && (
            <Alert severity="success" className="fade-in-fade-out" onClose={() => setSuccess(false)}>
              Registration successful! You will be redirected to login.
            </Alert>
          )}
          {error && (
            <Alert severity="error" onClose={() => setError("")} className="mb-4 fade-in-fade-out">
              {error}
            </Alert>
          )}
          <Typography
            variant="h3"
            sx={{
              margin: "auto",
            }}
          >
            Sign Up
          </Typography>
          <FormControl>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <Input
              id="name-input"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              id="email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>
          <Box className="flex justify-end items-center gap-2 mt-2" >
            <Typography>Already have an account?</Typography>
            <Button
              className="glass"
              onClick={() => navigate("/login")}
              sx={{ ml: "5px" }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SignUpPage;
