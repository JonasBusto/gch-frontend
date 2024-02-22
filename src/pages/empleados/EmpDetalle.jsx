import { useParams } from 'react-router-dom';
import empleados from '../../helpers/empleados';
import roles from '../../helpers/roles';
import '../../styles/empDetalle.css';
import AppContext from '../../context/GchContext';
import { useContext } from 'react';

export function EmpDetalle() {
  const { empleados, roles } = useContext(AppContext);
  const { id } = useParams();
  const empleadoObjeto = empleados?.filter((e) => e.id == id)[0];

  if (!empleados) {
    return <h1>Cargando...</h1>;
  } else if (!roles) {
    return <h1>Cargando...</h1>;
  }

  const puestoEmpleado = roles.filter((r) => r.id == empleadoObjeto.roleId)[0]
    ?.name;

  return (
    <div className='d-flex flex-column'>
      <div className='contain-det-emp'>
        <div className='titulo-det-emp'>
          <p>Detalles del empleado</p>
        </div>
        <div className='row m-0'>
          <div className='col-6 col-lg-4 img-det-emp'>
            <img
              className='img-fluid'
              src={empleadoObjeto.profilePicture}
              alt=''
            />
          </div>
          <div className='col-6 col-lg-4'>
            <div className='d-flex flex-column'>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Nombre completo: </b>
                </p>
                <p>
                  {empleadoObjeto.lastName + ', ' + empleadoObjeto.firstName}
                </p>
              </div>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Fecha Nacimiento: </b>
                </p>
                <p>{empleadoObjeto.birthDate}</p>
              </div>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Email: </b>
                </p>
                <a href={'mailto:' + empleadoObjeto.mail}>
                  {empleadoObjeto.mail}
                </a>
              </div>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Telefono: </b>
                </p>
                <p>{empleadoObjeto.phoneNumber}</p>
              </div>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Dirección: </b>
                </p>
                <p>{empleadoObjeto.address}</p>
              </div>
            </div>
          </div>
          <div className='col-12 col-lg-4'>
            <div className='d-flex flex-column'>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Puesto: </b>
                </p>
                <p>
                  {puestoEmpleado
                    ? puestoEmpleado
                    : 'No tiene asignado un Puesto'}
                </p>
              </div>

              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Supervisado por: </b>
                </p>
                <p>
                  {empleados.filter(
                    (r) => r.id == empleadoObjeto.supervisorId
                  )[0]
                    ? empleados.filter(
                        (r) => r.id == empleadoObjeto.supervisorId
                      )[0]?.lastName +
                      ', ' +
                      empleados.filter(
                        (r) => r.id == empleadoObjeto.supervisorId
                      )[0]?.firstName
                    : 'No tiene supervisor'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
