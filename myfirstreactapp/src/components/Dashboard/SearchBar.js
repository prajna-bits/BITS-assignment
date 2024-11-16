// components/SearchBar.js
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const [availability, setAvailability] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      title,
      author,
      genre,
      condition,
      availability,
      location,
    };
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Genre"
            variant="outlined"
            fullWidth
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Condition"
            variant="outlined"
            fullWidth
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Availability"
            variant="outlined"
            fullWidth
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBar;
