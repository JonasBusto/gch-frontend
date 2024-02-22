import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesEmpleado({ empleado, eliminarEmpleado }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='btn-acciones'>
      <Link to={'/empleados/cargar/' + empleado.id}>
        <i className='fa-solid fa-pencil'></i>
      </Link>
      <button onClick={handleShow}>
        <i className='fa-solid fa-trash-can'></i>
      </button>
      <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Eliminar Empleado'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Cuando este el backend, alertar que no puede eliminar
            al empleado porque tiene usuarios asociados. Que primero desvincule
            o elimine a esos usuarios */}
          {"¿Esta seguro de eliminar al empleado '" +
            empleado.lastName +
            ', ' +
            empleado.firstName +
            "'"}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancelar</button>
          <button onClick={() => eliminarEmpleado(empleado)}>Confirmar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export function RolesBody({ empleado, roles }) {
  let rolEmpleado = roles.filter((r) => r.id == empleado.roleId)[0];

  return <span>{rolEmpleado ? rolEmpleado.name : 'Sin rol Asignado'}</span>;
}

export function RolesField({ empleado, roles }) {
  let rolEmpleado = roles.filter((r) => r.id == empleado.roleId)[0];

  return rolEmpleado ? rolEmpleado.name : 'Sin rol Asignado';
}

export function PuestosBody({ empleado, puestos }) {
  let puestoEmpleado = puestos.filter((p) => p.id == empleado.positionId)[0];

  return (
    <span>{puestoEmpleado ? puestoEmpleado.name : 'Sin puesto Asignado'}</span>
  );
}

export function PuestosField({ empleado, roles }) {
  let puestoEmpleado = roles.filter((p) => p.id == empleado.positionId)[0];

  return puestoEmpleado ? puestoEmpleado.name : 'Sin puesto Asignado';
}
