import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesRol({ rol, eliminarRol }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='btn-acciones'>
      <Link to={'/roles/cargar/' + rol.id}>
        <i className='fa-solid fa-pencil'></i>
      </Link>
      <button onClick={handleShow}>
        <i className='fa-solid fa-trash-can'></i>
      </button>
      <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Eliminar Rol '}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Cuando este el backend, alertar que no puede eliminar
            al empleado porque tiene usuarios asociados. Que primero desvincule
            o elimine a esos usuarios */}
          {"¿Esta seguro de eliminar al rol '" + rol.name + "'?"}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancelar</button>
          <button onClick={() => eliminarRol(rol)}>Confirmar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
