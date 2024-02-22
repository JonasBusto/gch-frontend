import { useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Load } from '../../components/items/Load';
import GchContext from '../../context/GchContext';
import '../../styles/empleados.css';
import { AccionesRol } from '../../components/items/roles/DataTableRol';

export function Roles() {
  const { roles, eliminarRol } = useContext(GchContext);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  if (!roles) {
    return <Load />;
  }

  return (
    <div className='container-datatable'>
      <div className='d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search'>
        <div className='d-flex align-items-center justify-content-between'>
          <p>Lista de Roles</p>
          <Link to='/roles/cargar' className='btn-agregar'>
            <i className='me-2 fa-solid fa-plus'></i>Agregar
          </Link>
        </div>
        <InputText
          placeholder='Buscar Rol'
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
        value={roles}
      >
        <Column
          sortable
          field='name'
          header='Nombre Rol'
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          sortable
          field='description'
          header='Descripción'
          style={{ minWidth: '400px' }}
        ></Column>

        <Column
          header='Acciones'
          body={(rol) => <AccionesRol rol={rol} eliminarRol={eliminarRol} />}
        ></Column>
      </DataTable>
    </div>
  );
}
