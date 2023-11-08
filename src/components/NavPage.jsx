import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const NavPage = () => {
  return (
    <>
      <Navbar
        style={{ maxWidth: "1300px" }}
        collapseOnSelect
        expand="lg"
        className="mt-2 mx-auto bg-nav-custom"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="img-fluid"
                src="https://img.freepik.com/vector-premium/icono-linea-gestion-recursos-humanos_116137-1486.jpg"
                alt=""
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <Nav.Link as={Link} to="/" eventKey="1">
              Inicio
            </Nav.Link> */}
            <Nav.Link as={Link} to="/iniciar-sesion" eventKey="2">
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/empleados" eventKey="3">
              Empleados
            </Nav.Link>
            <Nav.Link as={Link} to="/puestos" eventKey="4">
              Puestos
            </Nav.Link>
            <Nav.Link as={Link} to="/departamentos" eventKey="5">
              Departamentos
            </Nav.Link>
            <Nav.Link as={Link} to="/usuarios" eventKey="6">
              Usuarios del Sistema
            </Nav.Link>
            <Nav.Link as={Link} to="/roles" eventKey="7">
              Roles del empleado
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavPage;
