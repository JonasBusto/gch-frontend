import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export function NavPage() {
  return (
    <>
      <Navbar
        style={{ maxWidth: '1300px' }}
        collapseOnSelect
        expand='sm'
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
            <NavDropdown title='Empleados' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/empleados-listado'>
                <i className='fa-solid fa-user-tie'></i> Ver Empleados
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/empleados'>
                <i className='fa-solid fa-user-tie'></i> Gestionar Empleados
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/habilidades'>
                <i className='fa-regular fa-address-book'></i> Gestionar
                Habilidades del Empleado
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/roles'>
                <i className='fa-regular fa-address-book'></i> Gestionar Roles
                del empleado
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/empleados/organigrama'>
                <i className='fa-solid fa-sitemap'></i> Organigrama de Empleados
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title='Departamentos' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/departamentos-listado'>
                <i className='fa-solid fa-building'></i> Ver Departamentos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/departamentos'>
                <i className='fa-solid fa-building'></i> Gestionar Departamentos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/puestos'>
                <i className='fa-solid fa-briefcase'></i> Gestionar Puestos de
                Departamentos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/niveles'>
                <i className='fa-solid fa-layer-group'></i> Gestionar Niveles de
                Departamentos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/departamentos/organigrama'>
                <i className='fa-solid fa-sitemap'></i> Organigrama de
                Departamentos
              </NavDropdown.Item>
            </NavDropdown>
            {/* <NavDropdown title='Usuarios' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/usuarios'>
                <i className='fa-solid fa-users'></i> Gestionar Usuarios del
                Sistema
              </NavDropdown.Item>
            </NavDropdown> */}
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
}
