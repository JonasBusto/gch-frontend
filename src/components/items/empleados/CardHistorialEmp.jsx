export function CardHistorialEmp({
  departamentos,
  puestos,
  historial,
  empleado,
  roles,
}) {
  let puestoEncontrado = puestos.filter(
    (p) => p.id === historial.positionId
  )[0];
  let departamentoEncontrado = departamentos.filter(
    (d) => d.id === historial.departmentId
  )[0];
  let rolEncontrado = roles.filter((r) => r.id === empleado.roleId)[0];

  return (
    <div className='col-12 col-md-6'>
      <div className='d-flex flex-column card-historial'>
        <div className='d-flex flex-column card-historial-header'>
          <h4>{puestoEncontrado ? puestoEncontrado.name : 'Desconocido'}</h4>
          <p>
            {puestoEncontrado ? puestoEncontrado.description : 'Desconocido'}
          </p>
        </div>
        <div className='d-flex flex-column card-historial-body'>
          <div className='sueldo-historial'>
            <p>
              Sueldo: $
              {puestoEncontrado
                ? Number(puestoEncontrado.salary).toFixed(2)
                : 'Desconocido'}
            </p>
          </div>
          <div className='rol-historial'>
            <p>
              Rol: {rolEncontrado ? rolEncontrado.name : 'Sin Rol Asignado'}{' '}
            </p>
          </div>
          <div className='rol-historial'>
            <p>
              Departamento:{' '}
              {departamentoEncontrado
                ? departamentoEncontrado.name
                : 'Sin Departamento Asignado'}{' '}
            </p>
          </div>
          <div>
            <p>
              {historial?.startDate} -{' '}
              {historial.endDate ? historial.endDate : 'Actualidad'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
