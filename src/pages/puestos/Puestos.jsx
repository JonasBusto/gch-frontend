import { useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Load } from '../../components/items/Load';

import GchContext from '../../context/GchContext';
import '../../styles/empleados.css';
import {
  AccionesPuesto,
  DepartamentoAsociadoBody,
  DepartamentoAsociadoField,
} from '../../components/items/puestos/DataTablePuesto';

export function Puestos() {
  const { puestos, departamentos, eliminarPuesto } = useContext(GchContext);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  if (!puestos || !departamentos) {
    return <Load />;
  }

  return (
    <div className='container-datatable'>
      <div className='d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search'>
        <div className='d-flex align-items-center justify-content-between'>
          <p>Lista de Puestos</p>
          <Link to='/puestos/cargar' className='btn-agregar'>
            <i className='me-2 fa-solid fa-plus'></i>Agregar
          </Link>
        </div>
        <InputText
          placeholder='Buscar Puesto'
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
        value={puestos}
      >
        <Column
          sortable
          field='name'
          header='Nombre'
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          sortable
          field='description'
          header='Descripción'
          style={{ minWidth: '400px' }}
        ></Column>
        <Column
          sortable
          field='salary'
          header='Salario [$]'
          style={{ minWidth: '250px' }}
        ></Column>

        <Column
          field={(puesto) => (
            <DepartamentoAsociadoField
              puesto={puesto}
              departamentos={departamentos}
            />
          )}
          header='ID Departamento asociado'
          body={(puesto) => (
            <DepartamentoAsociadoBody
              puesto={puesto}
              departamentos={departamentos}
            />
          )}
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          header='Acciones'
          body={(puesto) => (
            <AccionesPuesto puesto={puesto} eliminarPuesto={eliminarPuesto} />
          )}
        ></Column>
      </DataTable>
    </div>
  );
}
