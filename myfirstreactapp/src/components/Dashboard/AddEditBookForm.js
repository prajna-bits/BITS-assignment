import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

const AddEditBookForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      author: "",
      genre: "",
      condition: "",
      availability: true,
    }
  );

  useEffect(() => {
    // If there's initial data (editing), set the form data
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      let response;
      if (initialData) {
        // Editing an existing book (PUT request)
        response = await axios.patch(`http://localhost:3000/books/${initialData._id}`, {
          userId: userId,
          ...formData,
          updatedAt: new Date(),
        });
      } else {
        // Adding a new book (POST request)
        response = await axios.post("http://localhost:3000/books", {
          userId: userId,
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      if (onSubmit) {
        onSubmit(response.data); // Trigger onSubmit callback with the response
      }
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: "2rem",
        maxWidth: "500px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "1rem", textAlign: "center" }}>
        {initialData ? "Edit Book" : "Add Book"}
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
      />
      <TextField
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
      />
      <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "4px" }}>
        <InputLabel>Genre</InputLabel>
        <Select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          {["Fiction", "Non-Fiction", "Sci-Fi", "Mystery"].map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "4px" }}>
        <InputLabel>Condition</InputLabel>
        <Select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        >
          {["New", "Good", "Old"].map((condition) => (
            <MenuItem key={condition} value={condition}>
              {condition}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.availability}
            onChange={() =>
              setFormData({ ...formData, availability: !formData.availability })
            }
          />
        }
        label="Available"
        sx={{ marginTop: "1rem" }}
      />
      <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="submit" variant="contained" color="primary" sx={{ flex: 1, marginRight: "0.5rem" }}>
          Save
        </Button>
        <Button onClick={onCancel} variant="outlined" color="secondary" sx={{ flex: 1, marginLeft: "0.5rem" }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddEditBookForm;
