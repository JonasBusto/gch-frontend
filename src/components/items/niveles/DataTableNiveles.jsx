import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesNivel({ nivel, eliminarNivel }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='btn-acciones'>
      <Link to={'/niveles/cargar/' + nivel.id}>
        <i className='fa-solid fa-pencil'></i>
      </Link>
      <button onClick={handleShow}>
        <i className='fa-solid fa-trash-can'></i>
      </button>
      <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Eliminar Nivel ' + nivel.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Cuando este el backend, alertar que no puede eliminar
            al empleado porque tiene usuarios asociados. Que primero desvincule
            o elimine a esos usuarios */}
          {"¿Esta seguro de eliminar al empleado '" + nivel.nombre + "'?"}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancelar</button>
          <button onClick={() => eliminarNivel(nivel)}>Confirmar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export function DepartamentoAsociadoBody({ nivel, departamentos }) {
  let departamento = departamentos.filter((d) =>
    nivel.departmentsId.includes(d.id)
  );

  return (
    <div className='item-asociado'>
      <span>
        {departamento.map((d) => (
          <Link key={d.id} to={'/departamentos/cargar/' + d.id}>
            {'#' + d.name}
          </Link>
        ))}
      </span>
    </div>
  );
}

export function DepartamentoAsociadoField({ nivel, departamentos }) {
  let departamento = departamentos.filter(
    (d) => d.id == nivel.departmentsId
  )[0];
  let field = '#' + departamento?.id + ' - ' + departamento?.name;

  return field;
}
