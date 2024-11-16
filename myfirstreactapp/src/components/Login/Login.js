import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null); // Reset server error
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3000/users/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        navigate("/dashboard"); // Redirect to a protected page
      } catch (error) {
        console.error("API Error:", error);
        setServerError(
          error.response?.data?.message || "Something went wrong. Try again."
        );
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f7f7f7"
      padding="2rem"
    >
      <Paper elevation={3} sx={{ padding: "2rem", maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Login
        </Typography>
        {serverError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            {serverError}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <Box marginTop={2} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Login
            </Button>
          </Box>
          <Box marginTop={2} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Don't have an account? <a href="/registration">Register</a>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
