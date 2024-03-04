import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesDepartamento({
  puestos,
  departamento,
  departamentos,
  eliminarDepartamento,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let puestosAsociados = puestos.filter((puesto) =>
    departamento.positionsId.includes(puesto.id)
  );
  let depHijosAsociados = departamentos.filter((dep) =>
    departamento.childDepartmentsId.includes(dep.id)
  );
  let depPadreAsociados = departamentos.filter(
    (dep) => dep.id === departamento.parentDepartmentId
  )[0];

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
          <div className='p-3 d-flex flex-column detalle-borrado'>
            <p className='w-100'>No puede eliminar este departamento ya que:</p>
            {puestosAsociados.length > 0 && (
              <div className='d-flex flex-column w-100'>
                <p>
                  <i>Esta asociado a los siguientes puestos:</i>
                </p>
                <ul>
                  {puestosAsociados.map((puesto) => (
                    <li key={puesto.id}>
                      <Link
                        to={'/puestos/cargar/' + puesto.id}
                      >{`${puesto.name}`}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {depHijosAsociados.length > 0 && (
              <div className='d-flex flex-column w-100'>
                <p>
                  <i>Dependen de el los siguientes departamentos:</i>
                </p>
                <ul>
                  {depHijosAsociados.map((dep) => (
                    <li key={dep.id}>
                      <Link
                        to={'/departamentos/cargar/' + dep.id}
                      >{`${dep.name}`}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {depPadreAsociados && (
              <div className='d-flex flex-column w-100'>
                <p>
                  <i>Depende del departamento: </i>
                </p>
                <ul>
                  <li>
                    <Link
                      to={'/departamentos/cargar/' + depPadreAsociados.id}
                    >{`${depPadreAsociados.name}`}</Link>
                  </li>
                </ul>
              </div>
            )}
            <strong>Borre antes dichas asociaciones</strong>
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
