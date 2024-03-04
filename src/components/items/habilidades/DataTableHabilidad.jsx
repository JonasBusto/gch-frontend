import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesHabilidad({ empleados, habilidad, eliminarHabilidad }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let habilidadOcupada = empleados.filter((emp) =>
    emp.skillsId.includes(habilidad.id)
  );

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
        {habilidadOcupada.length > 0 ? (
          <div className='d-flex flex-column p-3 detalle-borrado'>
            <p>
              No puede eliminar esta habilidad ya que esta asociada a los
              empleados:
            </p>
            <ul>
              {habilidadOcupada.map((emp) => (
                <li key={emp.id}>
                  <Link
                    to={'/empleados/cargar/' + emp.id}
                  >{`${emp.lastName}, ${emp.firstName}`}</Link>
                </li>
              ))}
            </ul>
            <strong>Borre antes dichas asociaciones</strong>
          </div>
        ) : (
          <>
            <Modal.Body>
              {"¿Esta seguro de eliminar la habilidad '" +
                habilidad.name +
                "'?"}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Cancelar</button>
              <button onClick={() => eliminarHabilidad(habilidad)}>
                Confirmar
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
