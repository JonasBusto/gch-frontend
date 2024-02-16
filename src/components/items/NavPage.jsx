import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const NavPage = () => {
  return (
    <>
      <Navbar
        style={{ maxWidth: '1300px' }}
        collapseOnSelect
        expand='xl'
        className='mt-2 mx-auto bg-nav-custom'
      >
        <Container>
          <Navbar.Brand>
            <Link to='/'>
              <img
                className='img-fluid'
                src='https://img.freepik.com/vector-premium/icono-linea-gestion-recursos-humanos_116137-1486.jpg'
                alt=''
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            {/* <Nav.Link as={Link} to="/" eventKey="1">
              Inicio
            </Nav.Link> */}
            {/* <Nav.Link as={Link} to="/iniciar-sesion" eventKey="2">
              <i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión
            </Nav.Link> */}
            <NavDropdown title='Administrador' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/empleados'>
                <i className='fa-solid fa-user-tie'></i> Empleados ABM
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/habilidades'>
                <i className='fa-regular fa-address-book'></i> Habilidades ABM
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/puestos'>
                <i className='fa-solid fa-briefcase'></i> Puestos ABM
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/niveles'>
                <i className='fa-solid fa-layer-group'></i> Niveles ABM
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/departamentos'>
                <i className='fa-solid fa-building'></i> Departamentos ABM
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/usuarios'>
                <i className='fa-solid fa-users'></i> Usuarios del Sistema ABM
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/roles'>
                <i className='fa-regular fa-address-book'></i> Roles del
                empleado ABM
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Opciones' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/departamentos-listado'>
                <i className='fa-solid fa-building'></i> Departamentos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/empleados-listado'>
                <i className='fa-solid fa-user-tie'></i> Empleados
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/organigrama'>
                <i className='fa-solid fa-sitemap'></i> Organigrama
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
          <Navbar.Brand className='login-brand'>
            <Link
              to='/iniciar-sesion'
              className='d-flex flex-column align-items-center w-100 justify-content-center'
            >
              <img
                className='img-fluid'
                src='https://cdn-icons-png.flaticon.com/512/5509/5509636.png'
                alt=''
              />
              {/* <p>Iniciar Sesión</p> */}
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavPage;
