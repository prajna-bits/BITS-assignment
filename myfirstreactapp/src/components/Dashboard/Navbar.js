// components/Navbar.js
import React from "react";
import { AppBar, Toolbar, IconButton, Box, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ anchorEl, handleMenuOpen, handleMenuClose, handleProfileClick, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          paddingX: "2rem",
          paddingY: "0.8rem",
          backgroundColor: "#2196F3", // Lighter blue or primary color
          borderRadius: "10px", // Rounded corners for a softer look
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: "600", // Bold text for emphasis
            color: "#fff",
            cursor: "pointer",
            letterSpacing: "1px", // Slight spacing for modern look
            textTransform: "uppercase", // Capitalize each word
            fontFamily: "'Roboto', sans-serif", // Sleek and modern font
          }}
          onClick={() => navigate("/")}
        >
          📚 Book Exchange Platform
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="profile"
            onClick={handleMenuOpen}
            sx={{
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight background color on hover
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.4)", // Hover effect
              },
            }}
          >
            <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "#f4f4f8",
                color: "#2196F3",
                borderRadius: "8px",
                minWidth: "160px", // Make menu slightly wider
              },
            }}
          >
            <MenuItem onClick={handleProfileClick} sx={{ padding: "0.8rem" }}>Profile</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ padding: "0.8rem" }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
