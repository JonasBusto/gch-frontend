import { useState, useEffect } from 'react';
import { URL_BACKEND } from '../constants';

export function useGetDBdatos() {
  const [roles, setRoles] = useState(null);
  const [niveles, setNiveles] = useState(null);
  const [departamentos, setDepartamentos] = useState(null);
  const [habilidades, setHabilidades] = useState(null);
  const [puestos, setPuestos] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [empleados, setEmpleados] = useState(null);
  const [empleado, setEmpleado] = useState(null);
  const [idEmpleado, setIdEmpleado] = useState(null);
  const [historialEmpleado, setHistorialEmpleado] = useState(null);

  const getPuestos = () => {
    fetch(`${URL_BACKEND}positions`)
      .then((resultado) => resultado.json())
      .then((data) => setPuestos([...data]));
  };

  const getRol = () => {
    fetch(`${URL_BACKEND}roles`)
      .then((resultado) => resultado.json())
      .then((data) => setRoles([...data]));
  };

  const getDepartamentos = () => {
    fetch(`${URL_BACKEND}departments`)
      .then((resultado) => resultado.json())
      .then((data) => setDepartamentos([...data]));
  };

  const getNiveles = () => {
    fetch(`${URL_BACKEND}levels`)
      .then((resultado) => resultado.json())
      .then((data) => setNiveles([...data]));
  };

  const getHabilidades = () => {
    fetch(`${URL_BACKEND}skills`)
      .then((resultado) => resultado.json())
      .then((data) => setHabilidades([...data]));
  };

  const getUsuarios = () => {
    fetch(`${URL_BACKEND}users`)
      .then((resultado) => resultado.json())
      .then((data) => setUsuarios([...data]));
  };

  const getEmpleados = () => {
    fetch(`${URL_BACKEND}employees`)
      .then((resultado) => resultado.json())
      .then((data) => setEmpleados([...data]));
  };

  const getEmpleado = (id) => {
    fetch(`${URL_BACKEND}employees/${id}`)
      .then((resultado) => resultado.json())
      .then((data) => setEmpleado(data));
  };

  const getIdEmpleado = (id) => {
    setIdEmpleado(id);
  };

  const getHistorialEmpleado = (empleadoId) => {
    fetch(`${URL_BACKEND}employmentHistory/getEmployeeHistory/${empleadoId}`)
      .then((resultado) => resultado.json())
      .then((data) => setHistorialEmpleado([...data]));
  };

  useEffect(() => {
    if (idEmpleado) {
      getHistorialEmpleado(idEmpleado);
      getEmpleado(idEmpleado);
    }
  }, [idEmpleado]);

  useEffect(() => {
    getRol();
    getDepartamentos();
    getNiveles();
    getHabilidades();
    getPuestos();
    getUsuarios();
    getEmpleados();
  }, []);

  return {
    roles,
    niveles,
    departamentos,
    habilidades,
    puestos,
    usuarios,
    empleado,
    empleados,
    historialEmpleado,
    getIdEmpleado,
  };
}
