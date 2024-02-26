import { useParams } from 'react-router-dom';
import '../../styles/historial.css';
import { useContext, useEffect } from 'react';
import GchContext from '../../context/GchContext';
import { Load } from '../../components/items/Load';
import { CardHistorialEmp } from '../../components/items/empleados/CardHistorialEmp';

export function HistorialEmpleado() {
  const {
    departamentos,
    puestos,
    empleado,
    empleados,
    getIdEmpleado,
    roles,
    historialEmpleado,
  } = useContext(GchContext);
  const { id } = useParams();

  useEffect(() => {
    getIdEmpleado(id);
  }, []);

  if (
    !historialEmpleado ||
    !departamentos ||
    !puestos ||
    !empleados ||
    !empleado
  ) {
    return <Load />;
  }

  return (
    <div className='container-historial'>
      <div className='d-flex flex-column'>
        <h2>Historial del Empleado</h2>
        <div className='d-flex'>
          <div className='d-flex contain-img-emp-historial'>
            <img className='img-fluid' src={empleado.profilePicture} alt='' />
          </div>
          <div className='d-flex align-items-center nombre-emp-historial'>
            <h4>{empleado.lastName + ', ' + empleado.firstName}</h4>
          </div>
        </div>
        {historialEmpleado.length > 0 && (
          <div className='mt-3'>
            <h3 className='m-0'>Puestos:</h3>
          </div>
        )}
        <div className='row m-0'>
          <div className='row m-0'>
            {historialEmpleado.length > 0 ? (
              historialEmpleado.map((h) => (
                <CardHistorialEmp
                  key={h.id}
                  empleado={empleado}
                  puestos={puestos}
                  departamentos={departamentos}
                  roles={roles}
                  historial={h}
                />
              ))
            ) : (
              <div className='alert-historial d-flex justify-content-center'>
                <p>
                  Sin historial: Este empleado debe haber ingresado a algun
                  puesto
                </p>
              </div>
            )}
          </div>
          <div className='col-4'></div>
        </div>
      </div>
    </div>
  );
}
