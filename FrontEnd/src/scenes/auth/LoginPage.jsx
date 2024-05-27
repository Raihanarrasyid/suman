import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, API } = useAuth();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is authenticated (has a token)
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to the home page if authenticated
      navigate("/");
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });
      login(response.data.token, response.data.user);
      setSuccess(true);

      // Tambahkan timeout sebelum mengarahkan pengguna
      setTimeout(() => {
        navigate("/");
      }, 2000); // Penundaan selama 2 detik (2000 ms)
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400) {
        // Handle error code 400 (Bad Request)
        setSuccess(false);
        setError("invalid Credentials.");
      } else if (statusCode === 500) {
        // Handle error code 500 (Internal Server Error)
        setSuccess(false);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="loginPage my-20">
      <div className="loginContainer">
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
          {success ? (
            <Alert severity="success" className="fade-in-fade-out">
              Login successful! Welcome back.
            </Alert>
          ) : (
            error && (
              <Alert severity="error" className="fade-in-fade-out">
                {error}
              </Alert>
            )
          )}
          <Typography
            variant="h3"
            sx={{
              margin: "auto",
            }}
          >
            Login
          </Typography>
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
            Login
          </Button>

          <Box className="flex justify-end items-center gap-2 mt-2">
            <Typography>Don't have an account?</Typography>
            <Button
              className="glass"
              onClick={() => navigate("/signup")}
              sx={{ ml: "5px" }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default LoginPage;
