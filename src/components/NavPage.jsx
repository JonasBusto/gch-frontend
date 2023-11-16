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
        expand="xl"
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
              <i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/empleados" eventKey="3">
              <i className="fa-solid fa-user-tie"></i> Empleados
            </Nav.Link>
            <Nav.Link as={Link} to="/puestos" eventKey="4">
              <i className="fa-solid fa-briefcase"></i> Puestos
            </Nav.Link>
            <Nav.Link as={Link} to="/departamentos" eventKey="5">
              <i className="fa-solid fa-building"></i> Departamentos
            </Nav.Link>
            <Nav.Link as={Link} to="/usuarios" eventKey="6">
              <i className="fa-solid fa-users"></i> Usuarios del Sistema
            </Nav.Link>
            <Nav.Link as={Link} to="/roles" eventKey="7">
              <i className="fa-regular fa-address-book"></i> Roles del empleado
            </Nav.Link>
            <Nav.Link as={Link} to="/organigrama" eventKey="5">
              <i className="fa-solid fa-sitemap"></i> Organigrama
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavPage;
