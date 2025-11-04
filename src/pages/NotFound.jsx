import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router

const NotFound = () => {
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    color: "#343a40",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "4rem",
    margin: "0",
    color: "#dc3545",
  };

  const textStyle = {
    fontSize: "1.2rem",
    marginTop: "20px",
  };

  const linkStyle = {
    marginTop: "30px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "1rem",
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>404</h1>
      <p style={textStyle}>Page Not Found</p>
      <p style={textStyle}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={linkStyle}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
