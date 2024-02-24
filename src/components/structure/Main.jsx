import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Nosotros } from '../../pages/Nosotros';
import { Perfil } from '../../pages/Perfil';
import { Error404 } from '../../pages/Error404';
import { Departamentos } from '../../pages/departamentos/Departamentos';
import { DepListado } from '../../pages/departamentos/DepListado';
import { DepDetalles } from '../../pages/departamentos/DepDetalles';
import { FormDepartamentos } from '../../pages/departamentos/FormDepartamentos';
import { Empleados } from '../../pages/empleados/Empleados';
import { EmpListado } from '../../pages/empleados/EmpListado';
import { EmpDetalle } from '../../pages/empleados/EmpDetalle';
import { FormEmpleados } from '../../pages/empleados/FormEmpleados';
import { Habilidades } from '../../pages/habilidades/Habilidades';
import { FormHabilidades } from '../../pages/habilidades/FormHabilidades';
import { Niveles } from '../../pages/niveles/Niveles';
import { FormNiveles } from '../../pages/niveles/FormNiveles';
import { OrganigramaEmpleados } from '../../pages/organigrama/OrganigramaEmpleado';
import { OrganigramaDepartamentos } from '../../pages/organigrama/OrganigramaDepartamentos';
import { Puestos } from '../../pages/puestos/Puestos';
import { FormPuestos } from '../../pages/puestos/FormPuestos';
import { Roles } from '../../pages/roles/Roles';
import { FormRoles } from '../../pages/roles/FormRoles';
import { Usuarios } from '../../pages/usuarios/Usuarios';
import { FormUsuarios } from '../../pages/usuarios/FormUsuarios';
import { Route, Routes } from 'react-router-dom';
import { HistorialEmpleado } from '../../pages/empleados/HistorialEmpleado';

export function Main() {
  return (
    <main className='mt-2 mx-auto' style={{ maxWidth: '1300px' }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/iniciar-sesion' element={<Login />} />
        <Route path='/registrarse' element={<Register />} />
        <Route path='/empleados' element={<Empleados />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/roles' element={<Roles />} />
        <Route path='/niveles' element={<Niveles />} />
        <Route path='/puestos' element={<Puestos />} />
        <Route path='/habilidades' element={<Habilidades />} />
        <Route
          path='/empleados/organigrama'
          element={<OrganigramaEmpleados />}
        />
        <Route
          path='/departamentos/organigrama'
          element={<OrganigramaDepartamentos />}
        />
        <Route path='/info' element={<Nosotros />} />
        <Route path='/departamentos' element={<Departamentos />} />
        <Route path='/empleados-listado' element={<EmpListado />} />
        <Route path='/empleados-listado/:id' element={<EmpDetalle />} />
        <Route path='/departamentos-listado' element={<DepListado />} />
        <Route path='/departamentos-listado/:id' element={<DepDetalles />} />
        <Route path='/empleados/cargar/:id' element={<FormEmpleados />} />
        <Route path='/empleados/cargar/' element={<FormEmpleados />} />
        <Route path='/usuarios/cargar/:id' element={<FormUsuarios />} />
        <Route path='/usuarios/cargar/' element={<FormUsuarios />} />
        <Route path='/puestos/cargar/:id' element={<FormPuestos />} />
        <Route path='/puestos/cargar/' element={<FormPuestos />} />
        <Route path='/roles/cargar/:id' element={<FormRoles />} />
        <Route path='/roles/cargar/' element={<FormRoles />} />
        <Route path='/habilidades/cargar/:id' element={<FormHabilidades />} />
        <Route path='/habilidades/cargar/' element={<FormHabilidades />} />
        <Route path='/niveles/cargar/:id' element={<FormNiveles />} />
        <Route path='/niveles/cargar/' element={<FormNiveles />} />
        <Route
          path='/departamentos/cargar/:id'
          element={<FormDepartamentos />}
        />
        <Route path='/departamentos/cargar/' element={<FormDepartamentos />} />
        <Route path='/empleado/historial/:id' element={<HistorialEmpleado />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </main>
  );
}
