import { useState, useContext } from 'react';
import puestos from '../../helpers/puestos';
import departamentos from '../../helpers/departamentos';
import Modal from 'react-bootstrap/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import GchContext from '../../context/GchContext';
import '../../styles/empleados.css';

export function Puestos() {
  const { puestos, departamentos, eliminarPuesto } = useContext(GchContext);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const accion = (puesto) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div className='btn-acciones'>
        <Link to={'/puestos/cargar/' + puesto.id}>
          <i className='fa-solid fa-pencil'></i>
        </Link>
        <button onClick={handleShow}>
          <i className='fa-solid fa-trash-can'></i>
        </button>
        <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{'Eliminar Puesto ' + puesto.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Cuando este el backend, alertar que no puede eliminar
            al empleado porque tiene usuarios asociados. Que primero desvincule
            o elimine a esos usuarios */}
            {"¿Esta seguro de eliminar al empleado '" + puesto.nombre + "'?"}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancelar</button>
            <button onClick={() => eliminarPuesto(puesto)}>Confirmar</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const departamentoAsociado = (puesto) => {
    let departamento = departamentos.filter(
      (d) => d.id == puesto.id_departamento
    )[0];

    return (
      <div className='item-asociado'>
        <span>
          <Link to={'/departamentos/cargar/' + departamento.id_departamento}>
            {'#' + departamento.id + ' - ' + departamento.nombre}
          </Link>
        </span>
      </div>
    );
  };

  const fieldDepartamentoAsociado = (puesto) => {
    let departamento = departamentos.filter(
      (d) => d.id == puesto.id_departamento
    )[0];
    let field = '#' + departamento.id + ' - ' + departamento.nombre;

    return field;
  };

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
        {/* <Column
          sortable
          field="id"
          header="ID"
          style={{ minWidth: "100px" }}
        ></Column> */}
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

        {/* <Column
          field={fieldDepartamentoAsociado}
          header="ID Departamento asociado"
          body={departamentoAsociado}
          style={{ minWidth: "250px" }}
        ></Column> */}
        <Column header='Acciones' body={accion}></Column>
      </DataTable>
    </div>
  );
}
