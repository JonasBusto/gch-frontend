import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesRol({ empleados, rol, eliminarRol }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let rolAsignado = empleados.filter((emp) => emp.roleId === rol.id);

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
          <Modal.Title>{'Eliminar Rol'}</Modal.Title>
        </Modal.Header>

        {rolAsignado.length > 0 ? (
          <div className='p-3'>
            <p>
              No puede eliminar este rol ya que esta asociado a uno o varios
              empleados
            </p>
          </div>
        ) : (
          <>
            <Modal.Body>
              {"¿Esta seguro de eliminar al rol '" + rol.name + "'?"}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Cancelar</button>
              <button onClick={() => eliminarRol(rol)}>Confirmar</button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
