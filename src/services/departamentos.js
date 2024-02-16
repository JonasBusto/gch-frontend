import { URL_BACKEND } from '../constants';

export const altaDepartamento = (departamento) => {
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

export const eliminarDepartamento = (departamento) => {
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

export const modificarDepartamento = (departamento) => {
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
