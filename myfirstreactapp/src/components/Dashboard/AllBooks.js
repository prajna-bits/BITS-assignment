// AllBooks.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Container, CssBaseline, Alert, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import Navbar from "./Navbar";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const resultsPerPage = 10;
  const navigate = useNavigate();

  const fetchBooksFromSearch = async (page = 1, searchParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const skip = (page - 1) * resultsPerPage;
      const response = await axios.post("http://localhost:3000/books/search", {
        ...searchParams,
        limit: resultsPerPage,
        skip,
      });

      setBooks(response.data.books);
      setTotalResults(response.data.count || 0);
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    setCurrentPage(1);
    fetchBooksFromSearch(1, params);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchBooksFromSearch(value, searchParams);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    fetchBooksFromSearch(1);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f4f4f8", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar 
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleProfileClick={handleProfileClick}
        handleLogout={handleLogout}
      />

      <Container maxWidth="lg">
        <Box mt={4} mb={2}>
          <SearchBar onSearch={handleSearch} />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box mt={2}>
            <Alert severity="error" sx={{ textAlign: "center" }}>
              {error}
            </Alert>
          </Box>
        ) : books.length === 0 ? (
          <Box mt={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              No books found. Try refining your search!
            </Typography>
          </Box>
        ) : (
          <Box mt={4}>
            <Grid container spacing={3}>
              {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={book.id}>
                  <BookCard book={book} />
                </Grid>
              ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(totalResults / resultsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AllBooks;
