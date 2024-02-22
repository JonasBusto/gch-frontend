import { useContext, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Load } from '../../components/items/Load';
import {
  AccionesEmpleado,
  PuestosBody,
  PuestosField,
  RolesBody,
  RolesField,
} from '../../components/items/empleados/DataTableEmpleado';
import GchContext from '../../context/GchContext';
import '../../styles/empleados.css';

export function Empleados() {
  const { empleados, eliminarEmpleado, roles, puestos } =
    useContext(GchContext);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  if (!empleados || !puestos || !roles) {
    return <Load />;
  }

  return (
    <div className='container-datatable'>
      <div className='d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search'>
        <div className='d-flex align-items-center justify-content-between'>
          <p>Lista de Empleados</p>
          <Link to='/empleados/cargar' className='btn-agregar'>
            <i className='me-2 fa-solid fa-plus'></i>Agregar
          </Link>
        </div>
        <InputText
          placeholder='Buscar Empleado'
          onInput={(e) => {
            setFilters({
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            });
          }}
        />
      </div>

      <DataTable
        paginator
        removableSort
        selectionMode='single'
        scrollable
        filters={filters}
        rows={5}
        emptyMessage='Sin resultados'
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={empleados}
      >
        <Column
          sortable
          field='dni'
          header='DNI'
          style={{ minWidth: '100px' }}
        ></Column>
        <Column
          sortable
          field='firstName'
          header='Nombre'
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          sortable
          field='lastName'
          header='Apellido'
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          field={(empleado) => <RolesField empleado={empleado} roles={roles} />}
          header='Rol'
          body={(empleado) => <RolesBody empleado={empleado} roles={roles} />}
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          field={(empleado) => (
            <PuestosField empleado={empleado} puestos={puestos} />
          )}
          header='Puesto'
          body={(empleado) => (
            <PuestosBody empleado={empleado} puestos={puestos} />
          )}
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          sortable
          field='mail'
          header='Email'
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          sortable
          field='phoneNumber'
          header='Telefono'
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          header='Acciones'
          body={(empleado) => (
            <AccionesEmpleado
              empleado={empleado}
              eliminarEmpleado={eliminarEmpleado}
            />
          )}
        ></Column>
      </DataTable>
    </div>
  );
}
