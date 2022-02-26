import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/NavBar";
import Container from "react-bootstrap/Container";
import { AuthContext } from "./UserContextAuth";
import { useContext } from "react";

function MyNavbar() {

const { user, apiToken, handleUser } = useContext(AuthContext);

function handleClick ()
  {
    handleUser(null);
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#">Hotel California</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          {!user?<Nav.Link href="/login">Login</Nav.Link>:""}
          {!user?"":<Nav.Link href="#" onClick={handleClick}>Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
