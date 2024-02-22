import { Link } from 'react-router-dom';

export function CardEmpleado({ empleado, empleados, rolEmpleado }) {
  return (
    <div key={empleado.id} className='col-12 col-md-6 col-lg-4 col-emp'>
      <div className='d-flex flex-column col-card-emp'>
        <div className='card-emp-img d-flex justify-content-center'>
          <div></div>
          <img className='img-fluid' src={empleado.profilePicture} alt='' />
        </div>
        <div className='col-info-emp-card'>
          <div className='d-flex justify-content-center'>
            <p>{empleado.lastName + ', ' + empleado.firstName}</p>
          </div>
          <div className='d-flex justify-content-center'>
            <p className='text-center d-flex flex-column'>
              <span>
                <b>{rolEmpleado ? rolEmpleado : 'Sin rol asignado'}</b>
              </span>
              <span>
                Supervisado por:{' '}
                {empleados.filter((r) => r.id == empleado.supervisorId)[0]
                  ? empleados.filter(
                      (emp) => emp.id == empleado.supervisorId
                    )[0].firstName +
                    ', ' +
                    empleados.filter(
                      (emp) => emp.id == empleado.supervisorId
                    )[0].lastName
                  : 'No tiene'}
              </span>
            </p>
          </div>
        </div>
        <div className='d-flex justify-content-center col-detalle-emp-card'>
          <Link to={'' + empleado.id}>Detalle</Link>
        </div>
      </div>
    </div>
  );
}
