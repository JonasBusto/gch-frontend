import { URL_BACKEND } from '../constants';

export const altaNivel = (rol) => {
  fetch(`${URL_BACKEND}levels`, {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: rol.nombre,
      departmentsId: rol.id_departamento,
    }),
  }).then((res) => {
    res.json();
    alert('Nivel cargado exitosamente');
    window.location.reload();
  });
};

export const eliminarNivel = (rol) => {
  fetch(`${URL_BACKEND}levels/${rol.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(() => {
      alert('Nivel borrado');
      window.location.reload();
    });
};

export const modificarNivel = (rol) => {
  fetch(`${URL_BACKEND}levels/${rol.id}`, {
    method: 'PUT',
    crossDomain: true,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: rol.nombre,
      departmentsId: rol.id_departamento,
    }),
  }).then((res) => {
    res.json();
    alert('Nivel cargado exitosamente');
    window.location.reload();
  });
};
