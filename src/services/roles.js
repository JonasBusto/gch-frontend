import { URL_BACKEND } from '../constants';

export const altaRol = (rol) => {
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

export const eliminarRol = (rol) => {
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

export const modificarRol = (rol) => {
  fetch(`${URL_BACKEND}roles/${rol.id}`, {
    method: 'PUT',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      id: rol.id,
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
