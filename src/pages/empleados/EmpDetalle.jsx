import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Load } from '../../components/items/Load';
import GchContext from '../../context/GchContext';
import '../../styles/empDetalle.css';

export function EmpDetalle() {
  const { empleados, historialEmpleado, getIdEmpleado, roles, puestos } =
    useContext(GchContext);
  const { id } = useParams();
  const empleadoObjeto = empleados?.filter((e) => e.id == id)[0];
  const date = new Date();
  const diaActual = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const mesActual =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const añoActual = date.getFullYear();
  const añoEnMiliSegundo = 31536000000;

  useEffect(() => {
    getIdEmpleado(id);
  }, []);

  if (!empleados || !roles || !historialEmpleado || !puestos) {
    return <Load />;
  }

  const puestoEmpleado = puestos.filter((r) => r.id == empleadoObjeto.roleId)[0]
    ?.name;
  const rolEmpleado = roles.filter((r) => r.id == empleadoObjeto.roleId)[0]
    ?.name;

  const fechaActual = diaActual + '-' + mesActual + '-' + añoActual;
  const fechaPrimerPuesto = historialEmpleado[0]?.startDate;

  const calcularAntiguedad = (fechaActual, fechaInicio) => {
    if (fechaPrimerPuesto) {
      const [diaI, mesI, añoI] = fechaInicio.split('-');
      const [diaA, mesA, añoA] = fechaActual.split('-');

      const antiguedad =
        (new Date(añoA, mesA, diaA).getTime() -
          new Date(añoI, mesI, diaI).getTime()) /
        añoEnMiliSegundo;

      return antiguedad;
    } else {
      return 0;
    }
  };

  let antiguedad = calcularAntiguedad(fechaActual, fechaPrimerPuesto);

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
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Rol actual: </b>
                </p>
                <p>{rolEmpleado ? rolEmpleado : 'No tiene asignado un Rol'}</p>
              </div>
            </div>
          </div>
          <div className='col-12 col-lg-4 d-flex flex-column justify-content-between'>
            <div className='d-flex flex-column'>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Puesto actual: </b>
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
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Años de antiguedad: </b>
                </p>
                <p>
                  {historialEmpleado.length > 0
                    ? antiguedad < 1
                      ? 'Menos de un año'
                      : Math.floor(antiguedad) + ' Años'
                    : antiguedad + ' Años'}
                </p>
              </div>
            </div>
            <div className='btn-historial mb-5'>
              <Link to={'/empleado/historial/' + empleadoObjeto.id}>
                Ver Historial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
