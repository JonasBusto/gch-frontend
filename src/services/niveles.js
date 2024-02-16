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
      name: rol.nombre_rol,
    }),
  }).then((res) => {
    res.json();
    alert('Nivel cargado exitosamente');
    window.location.reload();
  });
};

export const eliminarNivel = (rol) => {};

export const modificarNivel = (rol) => {};
