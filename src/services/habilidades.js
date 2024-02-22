import { URL_BACKEND } from '../constants';

export const altaHabilidad = (habilidad) => {
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

export const eliminarHabilidad = (habilidad) => {
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

export const modificarHabilidad = (habilidad) => {
  fetch(`${URL_BACKEND}skills/${habilidad.id}`, {
    method: 'PUT',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      id: habilidad.id,
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
