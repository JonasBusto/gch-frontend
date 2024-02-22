import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesPuesto({ puesto, eliminarPuesto }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='btn-acciones'>
      <Link to={'/puestos/cargar/' + puesto.id}>
        <i className='fa-solid fa-pencil'></i>
      </Link>
      <button onClick={handleShow}>
        <i className='fa-solid fa-trash-can'></i>
      </button>
      <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Eliminar Puesto ' + puesto.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Cuando este el backend, alertar que no puede eliminar
            al empleado porque tiene usuarios asociados. Que primero desvincule
            o elimine a esos usuarios */}
          {"¿Esta seguro de eliminar el puesto '" + puesto.name + "'?"}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancelar</button>
          <button onClick={() => eliminarPuesto(puesto)}>Confirmar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export function DepartamentoAsociadoBody({ puesto, departamentos }) {
  let departamento = departamentos.filter(
    (d) => d.id === puesto.departmentId
  )[0];

  if (departamento) {
    return (
      <div className='item-asociado'>
        <span>
          <Link to={'/departamentos/cargar/' + departamento.id}>
            {'#' + departamento.name}
          </Link>
        </span>
      </div>
    );
  } else {
    return (
      <div className='item-asociado'>
        <span>Sin departamento asociado</span>
      </div>
    );
  }
}

export function DepartamentoAsociadoField({ puesto, departamentos }) {
  let departamento = departamentos.filter(
    (d) => d.id === puesto.departmentId
  )[0];
  let field;
  if (departamento) {
    field = '#' + departamento.name;
  } else {
    field = 'Sin departamento asociado';
  }
  return field;
}
