import { useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Load } from '../../components/items/Load';
import { Link } from 'react-router-dom';

import GchContext from '../../context/GchContext';
import '../../styles/empleados.css';
import {
  AccionesNivel,
  DepartamentoAsociadoBody,
  DepartamentoAsociadoField,
} from '../../components/items/niveles/DataTableNiveles';

export function Niveles() {
  const { niveles, departamentos, eliminarNivel } = useContext(GchContext);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  if (!niveles || !departamentos) {
    return <Load />;
  }

  return (
    <div className='container-datatable'>
      <div className='d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search'>
        <div className='d-flex align-items-center justify-content-between'>
          <p>Lista de Niveles</p>
          <Link to='/niveles/cargar' className='btn-agregar'>
            <i className='me-2 fa-solid fa-plus'></i>Agregar
          </Link>
        </div>
        <InputText
          placeholder='Buscar Nivel'
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
        value={niveles}
      >
        <Column
          sortable
          field='name'
          header='Nombre'
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          field={(nivel) => (
            <DepartamentoAsociadoField
              nivel={nivel}
              departamentos={departamentos}
            />
          )}
          header='Departamentos asociados'
          body={(nivel) => (
            <DepartamentoAsociadoBody
              nivel={nivel}
              departamentos={departamentos}
            />
          )}
          style={{ minWidth: '100px' }}
        ></Column>
        <Column
          header='Acciones'
          body={(nivel) => (
            <AccionesNivel nivel={nivel} eliminarNivel={eliminarNivel} />
          )}
        ></Column>
      </DataTable>
    </div>
  );
}
