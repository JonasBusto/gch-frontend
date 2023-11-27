import React from "react";
import Home from "../pages/Home";
import Empleados from "../pages/empleados/Empleados";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Puestos from "../pages/puestos/Puestos";
import Usuarios from "../pages/usuarios/Usuarios";
import Departamentos from "../pages/departamentos/Departamentos";
import FormEmpleados from "../pages/empleados/FormEmpleados";
import FormUsuarios from "../pages/usuarios/FormUsuarios";
import FormPuestos from "../pages/puestos/FormPuestos";
import FormDepartamentos from "../pages/departamentos/FormDepartamentos";
import Error404 from "../pages/Error404";
import FormRoles from "../pages/roles/FormRoles";
import Roles from "../pages/roles/Roles";
import Organigrama from "../pages/organigrama/Organigrama";
import Nosotros from "../pages/Nosotros";
import DepListado from "../pages/departamentos/DepListado";
import DepDetalles from "../pages/departamentos/DepDetalles";
import EmpListado from "../pages/empleados/EmpListado";
import EmpDetalle from "../pages/empleados/EmpDetalle";
import { Route, Routes } from "react-router-dom";

const Main = () => {
  return (
    <main className="mt-2 mx-auto" style={{ maxWidth: "1300px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/puestos" element={<Puestos />} />
        <Route path="/organigrama" element={<Organigrama />} />
        <Route path="/info" element={<Nosotros />} />
        <Route path="/departamentos" element={<Departamentos />} />
        <Route path="/empleados-listado" element={<EmpListado />} />
        <Route path="/empleados-listado/:id" element={<EmpDetalle />} />
        <Route path="/departamentos-listado" element={<DepListado />} />
        <Route path="/departamentos-listado/:id" element={<DepDetalles />} />
        <Route path="/empleados/cargar/:id" element={<FormEmpleados />} />
        <Route path="/empleados/cargar/" element={<FormEmpleados />} />
        <Route path="/usuarios/cargar/:id" element={<FormUsuarios />} />
        <Route path="/usuarios/cargar/" element={<FormUsuarios />} />
        <Route path="/puestos/cargar/:id" element={<FormPuestos />} />
        <Route path="/puestos/cargar/" element={<FormPuestos />} />
        <Route path="/roles/cargar/:id" element={<FormRoles />} />
        <Route path="/roles/cargar/" element={<FormRoles />} />
        <Route
          path="/departamentos/cargar/:id"
          element={<FormDepartamentos />}
        />
        <Route path="/departamentos/cargar/" element={<FormDepartamentos />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </main>
  );
};

export default Main;
