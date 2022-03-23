import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../Context/UserContextAuth";
import { useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./MyNavbar.css";

function MyNavbar({ saveUserEmail, saveApiToken }) {
  const { user, apiToken } = useContext(AuthContext);

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
    <Navbar bg="primary" variant="dark" className="navbar_container">
      <Container>
        <Navbar.Brand href="#">Hotel California</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          {!user ? <Nav.Link href="/login">Login</Nav.Link> : ""}
          {!user ? (
            ""
          ) : (
            <Nav.Link href="#" onClick={handleLogoutClick}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
