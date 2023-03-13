import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';


function NavBar() {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand  href="/">Gestion de stock</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/shops">Magasins</Nav.Link>
          <Nav.Link href="/categories">Categories</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default NavBar;