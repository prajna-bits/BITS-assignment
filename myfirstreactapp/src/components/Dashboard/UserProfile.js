import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography, Button, Paper, Divider } from "@mui/material";
import BookCard from "./BookCard";
import AddEditBookForm from "./AddEditBookForm";
import Navbar from "./Navbar";

const UserProfile = ({ userId }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // Track the book being edited

  //   const handleAddEditBook = async (formData) => {
  //     try {
  //       const userId = localStorage.getItem("userId");

  //       let response;
  //       if (editingBook) {
  //         // For editing, we use PATCH
  //         response = await axios.patch(`http://localhost:3000/books/${editingBook._id}`, formData);
  //         // Update local state with the edited book data

  //       } else {
  //         // For adding new book, we use POST
  //         response = await axios.post("http://localhost:3000/books", {
  //           userId,
  //           ...formData.createdBook,
  //           createdAt: new Date(),
  //           updatedAt: new Date(),
  //         });
  //         setBooks([response.data.createdBook, ...books]); // Add the new book
  //         // const response1 = await axios.get(
  //         //     `http://localhost:3000/books/user/${userId}`
  //         //   );
  //         // setBooks(response1.data.books);
  //       }

  //       setIsEditing(false);
  //       setEditingBook(null);
  //     } catch (err) {
  //       console.error("Error adding/editing book:", err);
  //       setError("Something went wrong. Please try again.");
  //     }
  //   };
  const handleAddEditBook = async (formData) => {
    try {
      const userId = localStorage.getItem("userId");
      const updatedBooksResponse = await axios.get(
        `http://localhost:3000/books/user/${userId}`
      );
      setBooks(updatedBooksResponse.data.books);
      setIsEditing(false);
      setEditingBook(null);
    } catch (err) {
      console.error("Error adding/editing book:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingBook(null); // Reset editing book
  };

  const handleEdit = (book) => {
    setEditingBook(book); // Set the book to be edited
    setIsEditing(true);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId)); // Remove deleted book from local state
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:3000/books/user/${userId}`
        );
        setBooks(response.data.books);
        setError(null); // Clear error message if books are fetched successfully
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("No books found for this user.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    };

    fetchUserBooks();
  }, [userId]);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f4f4f8", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h4" color="primary" gutterBottom>
          My Profile
        </Typography>

        <Paper sx={{ padding: "2rem", borderRadius: "8px", boxShadow: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                padding: "0.75rem 2rem",
              }}
            >
              Add a Book
            </Button>

            <Box flex={1} />
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ textAlign: "right" }}
              >
                {error}
              </Typography>
            )}
          </Box>

          {/* Render the Add/Edit Form */}
          {isEditing && (
            <Box mt={4}>
              <AddEditBookForm
                onSubmit={handleAddEditBook}
                initialData={editingBook} // Pass existing book data for editing
                onCancel={handleCancel} // Handle cancel
              />
            </Box>
          )}

          {/* Divider for visual separation */}
          <Divider sx={{ margin: "2rem 0" }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" color="textSecondary" gutterBottom>
              My Books
            </Typography>
          </Box>

          {/* Render Books in Grid */}
          <Grid container spacing={2}>
            {books?.map((book) => (
              <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
                <BookCard
                  book={book}
                  onEdit={() => handleEdit(book)} // Pass the edit handler
                  onDelete={() => handleDelete(book._id)}
                  fromPage="userProfile"
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserProfile;
