import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Paper,
} from "@mui/material";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    favoriteGenres: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for this field
  };

  const validate = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.favoriteGenres.trim()) {
      errors.favoriteGenres = "Favorite Genre is required.";
    }
    if (!formData.bio.trim()) {
      errors.bio = "Bio is required.";
    }
    return errors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null); // Reset server error
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/register",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            favoriteGenres: formData.favoriteGenres,
            bio: formData.bio,
          }
        );

        console.log("API Response:", response.data);
        navigate("/");
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
      <Paper elevation={3} sx={{ maxWidth: 600, width: "100%", padding: "2rem" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          User Registration
        </Typography>
        {serverError && (
          <Typography color="error" textAlign="center" gutterBottom>
            {serverError}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username}
          />
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
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            label="Favorite Genres"
            name="favoriteGenres"
            value={formData.favoriteGenres}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.favoriteGenres}
            helperText={errors.favoriteGenres}
          />
          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            error={!!errors.bio}
            helperText={errors.bio}
          />
          <Box marginTop={2} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegistrationForm;
