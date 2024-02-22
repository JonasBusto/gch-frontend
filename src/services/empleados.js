import { URL_BACKEND } from '../constants';

export const altaEmpleado = (empleado) => {
  fetch(`${URL_BACKEND}employees`, {
    method: 'POST',
    crossDomain: true,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      dni: empleado.dni,
      firstName: empleado.nombre,
      lastName: empleado.apellido,
      address: empleado.direccion,
      birthDate: empleado.fecha_nac,
      mail: empleado.email,
      phoneNumber: empleado.telefono,
      active: empleado.habilitado,
      skillsId: empleado.id_habilidades,
      supervisorId:
        empleado.id_supervisor.length === 0 ? null : empleado.id_supervisor,
      subordinatesId: empleado.id_subordinados,
      positionId: empleado.id_puesto.length === 0 ? null : empleado.id_puesto,
      profilePicture: empleado.foto_perfil,
      roleId: empleado.id_rol.length === 0 ? null : empleado.id_rol,
      userId: empleado.id_usuario.length === 0 ? null : empleado.id_usuario,
    }),
  }).then((res) => {
    res.json();
    alert('Empleado cargado exitosamente');
    window.location.reload();
  });
};

export const eliminarEmpleado = (empleado) => {
  fetch(`${URL_BACKEND}employees/${empleado.id}`, {
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

export const modificarEmpleado = (empleado) => {
  fetch(`${URL_BACKEND}employees/${empleado.id}`, {
    method: 'PUT',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      id: empleado.id,
      dni: empleado.dni,
      firstName: empleado.nombre,
      lastName: empleado.apellido,
      address: empleado.direccion,
      birthDate: empleado.fecha_nac,
      mail: empleado.email,
      phoneNumber: empleado.telefono,
      active: empleado.habilitado,
      skillsId: empleado.id_habilidades,
      supervisorId:
        empleado.id_supervisor.length === 0 ? null : empleado.id_supervisor,
      subordinatesId: empleado.id_subordinados,
      positionId: empleado.id_puesto.length === 0 ? null : empleado.id_puesto,
      profilePicture: empleado.foto_perfil,
      roleId: empleado.id_rol.length === 0 ? null : empleado.id_rol,
      userId: empleado.id_usuario.length === 0 ? null : empleado.id_usuario,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert('Empleado modificado');
      window.location.reload();
    })
    .catch((error) => console.log('error: ', error));
};
