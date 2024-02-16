import { URL_BACKEND } from '../constants';

export const altaPuesto = (puesto) => {
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

export const eliminarPuesto = (puesto) => {
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

export const modificarPuesto = (puesto) => {
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
