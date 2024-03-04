import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesNivel({ departamentos, nivel, eliminarNivel }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let departamentosAsociados = departamentos.filter((dep) =>
    nivel.departmentsId.includes(dep.id)
  );

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
          <Modal.Title>{'Eliminar Nivel'}</Modal.Title>
        </Modal.Header>

        {nivel.departmentsId.length > 0 ? (
          <div className='p-3 detalle-borrado'>
            <p>
              No puede eliminar este nivel ya que esta asociada a uno o varios
              departamentos
            </p>
            <ul>
              {departamentosAsociados.map((dep) => (
                <li key={dep.id}>
                  <Link
                    to={'/departamentos/cargar/' + dep.id}
                  >{`${dep.name}`}</Link>
                </li>
              ))}
            </ul>
            <strong>Borre antes dicha asociación</strong>
          </div>
        ) : (
          <>
            <Modal.Body>
              {"¿Esta seguro de eliminar al nivel '" + nivel.name + "'?"}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Cancelar</button>
              <button onClick={() => eliminarNivel(nivel)}>Confirmar</button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export function DepartamentoAsociadoBody({ nivel, departamentos }) {
  let departamento = departamentos.filter((d) =>
    nivel.departmentsId.includes(d.id)
  );

  if (departamento.length > 0) {
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
  } else {
    return (
      <div className='item-asociado'>
        <span>Sin departamentos asociado</span>
      </div>
    );
  }
}

export function DepartamentoAsociadoField({ nivel, departamentos }) {
  let departamento = departamentos.filter(
    (d) => d.id == nivel.departmentsId
  )[0];
  let field = '#' + departamento?.id + ' - ' + departamento?.name;

  return field;
}
