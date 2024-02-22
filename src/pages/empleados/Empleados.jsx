import { useContext, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import GchContext from '../../context/GchContext';
import '../../styles/empleados.css';

export function Empleados() {
  const { empleados, eliminarEmpleado, roles, puestos } =
    useContext(GchContext);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  if (!empleados || !puestos || !roles) {
    return <h1>Cargando...</h1>;
  }

  const accion = (empleado) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div className='btn-acciones'>
        <Link to={'/empleados/cargar/' + empleado.id}>
          <i className='fa-solid fa-pencil'></i>
        </Link>
        <button onClick={handleShow}>
          <i className='fa-solid fa-trash-can'></i>
        </button>
        <Modal className='modal-custom-accion' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{'Eliminar Empleado'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Cuando este el backend, alertar que no puede eliminar
            al empleado porque tiene usuarios asociados. Que primero desvincule
            o elimine a esos usuarios */}
            {"¿Esta seguro de eliminar al empleado '" +
              empleado.lastName +
              ', ' +
              empleado.firstName +
              "'"}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancelar</button>
            <button onClick={() => eliminarEmpleado(empleado)}>
              Confirmar
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const rolesBody = (empleado) => {
    let rolEmpleado = roles.filter((r) => r.id == empleado.roleId)[0];

    return <span>{rolEmpleado ? rolEmpleado.name : 'Sin rol Asignado'}</span>;
  };

  const rolesField = (empleado) => {
    let rolEmpleado = roles.filter((r) => r.id == empleado.roleId)[0];

    return rolEmpleado ? rolEmpleado.name : 'Sin rol Asignado';
  };

  const puestosBody = (empleado) => {
    let puestoEmpleado = puestos.filter((p) => p.id == empleado.positionId)[0];

    return (
      <span>
        {puestoEmpleado ? puestoEmpleado.name : 'Sin puesto Asignado'}
      </span>
    );
  };

  const puestosField = (empleado) => {
    let puestoEmpleado = roles.filter((p) => p.id == empleado.positionId)[0];

    return puestoEmpleado ? puestoEmpleado.name : 'Sin puesto Asignado';
  };

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
          field={rolesField}
          header='Rol'
          body={rolesBody}
          style={{ minWidth: '250px' }}
        ></Column>
        <Column
          field={puestosField}
          header='Puesto'
          body={puestosBody}
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
        <Column header='Acciones' body={accion}></Column>
      </DataTable>
    </div>
  );
}
