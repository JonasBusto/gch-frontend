import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export function AccionesEmpleado({ empleado, empleados, eliminarEmpleado }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let empleadosSubAsociados = empleados.filter((emp) =>
    empleado.subordinatesId.includes(emp.id)
  );
  let empleadoSupAsociado = empleados.filter(
    (emp) => emp.id === empleado.supervisorId
  )[0];

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
        {empleado.subordinatesId.length > 0 || empleado.supervisorId ? (
          <div className='p-3'>
            {empleado.subordinatesId.length > 0 && (
              <div className='d-flex flex-column'>
                <p>
                  No puede eliminar este empleado ya que esta supervisando a:
                </p>
                <ul>
                  {empleadosSubAsociados.map((emp) => (
                    <li key={emp.id}>
                      <Link to={'/empleados/cargar/' + emp.id}>
                        {`${emp.lastName}, ${emp.firstName}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {empleadoSupAsociado && (
              <div className='d-flex flex-column'>
                <p>
                  No puede eliminar este empleado ya que es supervisado por:
                </p>
                <ul>
                  <li>
                    <Link
                      to={'/empleados/cargar/' + empleadoSupAsociado.id}
                    >{`${empleadoSupAsociado.lastName}, ${empleadoSupAsociado.firstName}`}</Link>
                  </li>
                </ul>
              </div>
            )}
            <strong>Borre antes dichas asociaciones</strong>
          </div>
        ) : (
          <>
            <Modal.Body>
              {"¿Esta seguro de eliminar al empleado '" +
                empleado.lastName +
                ', ' +
                empleado.firstName +
                "'"}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Cancelar</button>
              <button onClick={() => eliminarEmpleado(empleado)}>
                Confirmar
              </button>
            </Modal.Footer>
          </>
        )}
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
