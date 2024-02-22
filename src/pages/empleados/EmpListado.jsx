import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import empleados from '../../helpers/empleados';
import roles from '../../helpers/roles';
import AppContext from '../../context/GchContext';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import '../../styles/empListado.css';
import 'primeflex/primeflex.css';

export function EmpListado() {
  const { empleados, roles } = useContext(AppContext);
  const [filter, setFilter] = useState([]);
  const [inputBuscar, setInputBuscar] = useState('');

  const onChangeInput = (inputBuscar) => {
    let arrayAux =
      empleados?.filter(
        (p) =>
          (p.firstName + ' ' + p.lastName)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(inputBuscar.toLowerCase().trim()) ||
          (p.lastName + ' ' + p.firstName)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(inputBuscar.toLowerCase().trim())
      ) || [];

    setFilter([...arrayAux]);
  };

  useEffect(() => {
    onChangeInput(inputBuscar);
  }, [inputBuscar]);

  useEffect(() => {
    if (empleados) {
      setFilter([...empleados]);
    }
  }, [empleados]);

  if (!empleados) {
    return <h1>Caasdasd-</h1>;
  }

  const itemTemplate = (e) => {
    const rolEmpleado = roles.filter((r) => r.id == e.roleId)[0]?.name;

    return (
      <div key={e.id} className='col-12 col-md-6 col-lg-4 col-emp'>
        <div className='d-flex flex-column col-card-emp'>
          <div className='card-emp-img d-flex justify-content-center'>
            <div></div>
            <img className='img-fluid' src={e.profilePicture} alt='' />
          </div>
          <div className='col-info-emp-card'>
            <div className='d-flex justify-content-center'>
              <p>{e.lastName + ', ' + e.firstName}</p>
            </div>
            <div className='d-flex justify-content-center'>
              <p className='text-center d-flex flex-column'>
                <span>
                  <b>{rolEmpleado ? rolEmpleado : 'Sin rol asignado'}</b>
                </span>
                <span>
                  Supervisado por:{' '}
                  {empleados.filter((r) => r.id == e.supervisorId)[0]
                    ? empleados.filter((emp) => emp.id == e.supervisorId)[0]
                        .firstName +
                      ', ' +
                      empleados.filter((emp) => emp.id == e.supervisorId)[0]
                        .lastName
                    : 'No tiene'}
                </span>
              </p>
            </div>
          </div>
          <div className='d-flex justify-content-center col-detalle-emp-card'>
            <Link to={'' + e.id}>Detalle</Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '95vw', maxWidth: '1300px' }}>
      <div className='row m-0'></div>
      <div className='d-flex flex-column contain-list-emp'>
        <div className='w-100 contain-header-listado'>
          <p>Lista de empleados</p>
          <div className='mx-3 mb-3'>
            <InputText
              onChange={(e) => setInputBuscar(e.target.value)}
              placeholder='Buscar Empleado'
              onInput={(e) => {}}
            />
          </div>
        </div>
        <DataView
          value={filter}
          itemTemplate={itemTemplate}
          paginator
          emptyMessage='Sin resultados'
          rows={6}
        />
      </div>
    </div>
  );
}
