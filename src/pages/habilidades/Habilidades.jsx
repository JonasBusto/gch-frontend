import { useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Load } from '../../components/items/Load';
import Modal from 'react-bootstrap/Modal';
import GchContext from '../../context/GchContext';
import '../../styles/empleados.css';

export function Habilidades() {
  const { eliminarHabilidad, habilidades } = useContext(GchContext);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  if (!habilidades) {
    return <Load />;
  }

  const accion = (habilidad) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div className='btn-acciones'>
        <Link to={'/habilidades/cargar/' + habilidad.id}>
          <i className='fa-solid fa-pencil'></i>
        </Link>
        <button onClick={handleShow}>
          <i className='fa-solid fa-trash-can'></i>
        </button>
        <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{'Eliminar Habilidad '}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"¿Esta seguro de eliminar la habilidad '" + habilidad.name + "'?"}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancelar</button>
            <button onClick={() => eliminarHabilidad(habilidad)}>
              Confirmar
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div className='container-datatable'>
      <div className='d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search'>
        <div className='d-flex align-items-center justify-content-between'>
          <p>Lista de Habilidades</p>
          <Link to='/habilidades/cargar' className='btn-agregar'>
            <i className='me-2 fa-solid fa-plus'></i>Agregar
          </Link>
        </div>
        <InputText
          placeholder='Buscar Departamento'
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
        value={habilidades}
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
        <Column header='Acciones' body={accion}></Column>
      </DataTable>
    </div>
  );
}
