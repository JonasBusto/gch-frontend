import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesDepartamento({ departamento, eliminarDepartamento }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='btn-acciones'>
      <Link to={'/departamentos/cargar/' + departamento.id}>
        <i className='fa-solid fa-pencil'></i>
      </Link>
      <button onClick={handleShow}>
        <i className='fa-solid fa-trash-can'></i>
      </button>
      <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Eliminar Departamento'}</Modal.Title>
        </Modal.Header>
        {departamento.childDepartmentsId.length > 0 ||
        departamento.parentDepartmentId ||
        departamento.positionsId.length > 0 ? (
          <div className='p-3'>
            <p>
              No puede eliminar este departamento ya que esta asociado a uno o
              varios departamentos, o tiene puestos que dependen de el. Borre
              antes dichas asociaciones
            </p>
          </div>
        ) : (
          <>
            <Modal.Body>
              {"¿Esta seguro de eliminar al departamento '" +
                departamento.name +
                "'?"}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Cancelar</button>
              <button onClick={() => eliminarDepartamento(departamento)}>
                Confirmar
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
