import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesHabilidad({ habilidad, eliminarHabilidad }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='btn-acciones'>
      <Link to={'/habilidades/cargar/' + habilidad.id}>
        <i className='fa-solid fa-pencil'></i>
      </Link>
      <button onClick={handleShow}>
        <i className='fa-solid fa-trash-can'></i>
      </button>
      <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Eliminar Habilidad '}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {"¿Esta seguro de eliminar la habilidad '" + habilidad.name + "'?"}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancelar</button>
          <button onClick={() => eliminarHabilidad(habilidad)}>
            Confirmar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
