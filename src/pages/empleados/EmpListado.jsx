import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { Load } from '../../components/items/Load';
import { CardEmpleado } from '../../components/items/empleados/CardEmpleado';
import GchContext from '../../context/GchContext';
import '../../styles/empListado.css';
import 'primeflex/primeflex.css';

export function EmpListado() {
  const { empleados, roles } = useContext(GchContext);
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
    return <Load />;
  }

  const itemTemplate = (empleado) => {
    const rolEmpleado = roles.filter((r) => r.id == empleado.roleId)[0]?.name;

    return (
      <CardEmpleado
        empleados={empleados}
        empleado={empleado}
        rolEmpleado={rolEmpleado}
      />
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
