import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDBdatos } from '../hooks/useGetDBdatos';
import { URL_BACKEND } from '../constants';

const GchContext = createContext();

export function GchProvider({ children }) {
  const { roles, niveles, departamentos, habilidades, puestos } =
    useGetDBdatos();

  // Puestos

  const altaPuesto = (puesto) => {
    fetch(`${URL_BACKEND}positions`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: puesto.nombre,
        description: puesto.desc,
        salary: puesto.salario,
        departmentId: puesto.id_departamento,
      }),
    }).then((res) => {
      res.json();
      alert('Puesto cargado exitosamente');
      window.location.reload();
    });
  };

  const eliminarPuesto = (puesto) => {
    fetch(`${URL_BACKEND}positions/${puesto.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('Puesto borrado');
        window.location.reload();
      });
  };

  const modificarPuesto = (puesto) => {
    fetch(`${URL_BACKEND}positions/${puesto.id}`, {
      method: 'PUT',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: puesto.nombre,
        description: puesto.desc,
        salary: puesto.salario,
        departmentId: puesto.id_departamento,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Puesto modificado');
        window.location.reload();
      })
      .catch((error) => console.log('error: ', error));
  };

  // Departamentos

  const altaDepartamento = (departamento) => {
    fetch(`${URL_BACKEND}departments`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: departamento.nombre,
        description: departamento.desc,
      }),
    }).then((res) => {
      res.json();
      alert('Departamento cargado exitosamente');
      window.location.reload();
    });
  };

  const eliminarDepartamento = (departamento) => {
    fetch(`${URL_BACKEND}departments/${departamento.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('Departamento borrado');
        window.location.reload();
      });
  };

  const modificarDepartamento = (departamento) => {
    fetch(`${URL_BACKEND}departments/${departamento.id}`, {
      method: 'PUT',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: departamento.nombre,
        description: departamento.desc,
        levelId: null,
        childDepartmentsI: [],
        parentDepartmentId: null,
        positionsId: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Departamento modificado');
        window.location.reload();
      })
      .catch((error) => console.log('error: ', error));
  };

  // Niveles

  const altaNivel = (rol) => {
    fetch(`${URL_BACKEND}levels`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: rol.nombre_rol,
      }),
    }).then((res) => {
      res.json();
      alert('Nivel cargado exitosamente');
      window.location.reload();
    });
  };

  // Roles

  const altaRol = (rol) => {
    fetch(`${URL_BACKEND}roles`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: rol.nombre_rol,
        description: rol.desc_rol,
      }),
    }).then((res) => {
      res.json();
      alert('Rol cargado exitosamente');
      window.location.reload();
    });
  };

  const eliminarRol = (rol) => {
    fetch(`${URL_BACKEND}roles/${rol.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('Rol borrado');
        window.location.reload();
      });
  };

  const modificarRol = (rol) => {
    fetch(`${URL_BACKEND}roles/${rol.id}`, {
      method: 'PUT',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: rol.nombre_rol,
        description: rol.desc_rol,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Rol modificado');
        window.location.reload();
      })
      .catch((error) => console.log('error: ', error));
  };

  // Habilidades

  const altaHabilidad = (habilidad) => {
    fetch(`${URL_BACKEND}skills`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: habilidad.nombre,
        description: habilidad.desc,
      }),
    }).then((res) => {
      res.json();
      alert('Habilidad cargada exitosamente');
      window.location.reload();
    });
  };

  const eliminarHabilidad = (habilidad) => {
    fetch(`${URL_BACKEND}skills/${habilidad.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('Habilidad borrada');
        window.location.reload();
      });
  };

  const modificarHabilidad = (habilidad) => {
    fetch(`${URL_BACKEND}skills/${habilidad.id}`, {
      method: 'PUT',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: habilidad.nombre,
        description: habilidad.desc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Habilidad modificada');
        window.location.reload();
      })
      .catch((error) => console.log('error: ', error));
  };

  return (
    <GchContext.Provider
      value={{
        puestos,
        modificarPuesto,
        eliminarPuesto,
        altaPuesto,
        eliminarHabilidad,
        modificarHabilidad,
        altaHabilidad,
        habilidades,
        eliminarDepartamento,
        departamentos,
        altaDepartamento,
        modificarDepartamento,
        niveles,
        modificarRol,
        altaRol,
        roles,
        eliminarRol,
      }}
    >
      {children}
    </GchContext.Provider>
  );
}

export default GchContext;
