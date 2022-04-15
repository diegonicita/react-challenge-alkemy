import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { UserAuthContext } from "../../Auth/UserAuthContext";
import { useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./MyNavbar.css";
import { Link, NavLink } from 'react-router-dom'

function MyNavbar({ saveUserEmail, saveApiToken }) {
  const { user, apiToken } = useContext(UserAuthContext);

  const mySwal = withReactContent(Swal);

  function handleLogoutClick() {
    mySwal.fire({
      icon: "success",
      position: "top-end",
      title: "Cerrando la sesion...",
      timer: 1000,
      showConfirmButton: false,
      // footer: '<a href="">Why do I have this issue?</a>'
    });

    setTimeout(() => {
      saveUserEmail(null);
      saveApiToken(null);
    }, 1000);
  }

  return (
  <>
  <Navbar bg="primary" expand="sm" variant="dark">
  <Container>
    <Navbar.Brand as={NavLink} to="/">Hotel California</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {!user ? "":<Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>}
        {!user ? "":<Nav.Link as={NavLink} to="/about">About</Nav.Link>}
        {!user ? "":<Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>}
        <NavDropdown title="Users" id="basic-nav-dropdown">
          {!user ? <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>: ""}
          {!user ? "":<NavDropdown.Item as={Link} to="#" onClick={handleLogoutClick}>Logout</NavDropdown.Item>}
          {!user ? <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>: ""}
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="#">Help</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>    
  </>
  );
}

export default MyNavbar;
