import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  CardHeader,
} from "@mui/material";

const BookCard = ({ book, onEdit, onDelete, fromPage }) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        margin: "1rem",
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <CardHeader
        sx={{
          bgcolor: "primary.main",
          color: "white",
          textAlign: "center",
          padding: "1rem",
        }}
        title={
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {book.title}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            by {book.author}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Genre:</strong> {book.genre}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Condition:</strong> {book.condition}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Location:</strong> {book.location}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: book.availability ? "success.main" : "error.main",
            fontWeight: "bold",
          }}
        >
          {book.availability ? "Available" : "Not Available"}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
        }}
      >
        {!fromPage? <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: "capitalize" }}
        >
          Request
        </Button> : <><Button
          size="small"
          variant="outlined"
          onClick={() => onEdit(book)}
          sx={{ textTransform: "capitalize" }}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => onDelete(book.id)}
          sx={{ textTransform: "capitalize" }}
        >
          Delete
        </Button></>
        }
      </CardActions>
    </Card>
  );
};

export default BookCard;
