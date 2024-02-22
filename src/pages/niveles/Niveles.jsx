import { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import GchContext from '../../context/GchContext';
import { Link } from 'react-router-dom';
import '../../styles/empleados.css';

export function Niveles() {
  const { niveles, departamentos, eliminarNivel } = useContext(GchContext);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  if (!niveles || !departamentos) {
    return <h1>Cargando...</h1>;
  }

  const accion = (nivel) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div className='btn-acciones'>
        <Link to={'/niveles/cargar/' + nivel.id}>
          <i className='fa-solid fa-pencil'></i>
        </Link>
        <button onClick={handleShow}>
          <i className='fa-solid fa-trash-can'></i>
        </button>
        <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{'Eliminar Nivel ' + nivel.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Cuando este el backend, alertar que no puede eliminar
            al empleado porque tiene usuarios asociados. Que primero desvincule
            o elimine a esos usuarios */}
            {"¿Esta seguro de eliminar al empleado '" + nivel.nombre + "'?"}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancelar</button>
            <button onClick={() => eliminarNivel(nivel)}>Confirmar</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const departamentoAsociado = (nivel) => {
    let departamento = departamentos.filter((d) =>
      nivel.departmentsId.includes(d.id)
    );

    return (
      <div className='item-asociado'>
        <span>
          {departamento.map((d) => (
            <Link key={d.id} to={'/departamentos/cargar/' + d.id}>
              {'#' + d.name}
            </Link>
          ))}
        </span>
      </div>
    );
  };

  const fieldDepartamentoAsociado = (nivel) => {
    let departamento = departamentos.filter(
      (d) => d.id == nivel.departmentsId
    )[0];
    let field = '#' + departamento?.id + ' - ' + departamento?.name;

    return field;
  };

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
          field={fieldDepartamentoAsociado}
          header='Departamentos asociados'
          body={departamentoAsociado}
          style={{ minWidth: '100px' }}
        ></Column>
        <Column header='Acciones' body={accion}></Column>
      </DataTable>
    </div>
  );
}
