import React, { useState } from "react";
import puestos from "../../helpers/puestos";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "../../styles/empleados.css";
import { Link } from "react-router-dom";

const Puestos = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const accion = (puesto) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div className="btn-acciones">
        <Link to={"/puestos/cargar/" + puesto.id}>
          <i className="fa-solid fa-pencil"></i>
        </Link>
        <button onClick={handleShow}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <Modal className="modal-custom-accion" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{"Eliminar Puesto " + puesto.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Cuando este el backend, alertar que no puede eliminar
            al empleado porque tiene usuarios asociados. Que primero desvincule
            o elimine a esos usuarios */}
            {"¿Esta seguro de eliminar al empleado '" + puesto.nombre + "'?"}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancelar</button>
            <button onClick={handleClose}>Confirmar</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div className="container-datatable">
      <div className="d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search">
        <div className="d-flex align-items-center justify-content-between">
          <p>Lista de Puestos</p>
          <Link to="/puestos/cargar" className="btn-agregar">
            <i className="me-2 fa-solid fa-plus"></i>Agregar
          </Link>
        </div>
        <InputText
          placeholder="Buscar Puesto"
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
        selectionMode="single"
        scrollable
        filters={filters}
        rows={5}
        emptyMessage="Sin resultados"
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={puestos}
      >
        <Column
          sortable
          field="id"
          header="ID"
          style={{ minWidth: "100px" }}
        ></Column>
        <Column
          sortable
          field="nombre"
          header="Nombre"
          style={{ minWidth: "250px" }}
        ></Column>
        <Column
          sortable
          field="desc"
          header="Descripción"
          style={{ minWidth: "400px" }}
        ></Column>
        <Column
          sortable
          field="salario"
          header="Salario [$]"
          style={{ minWidth: "250px" }}
        ></Column>

        <Column
          sortable
          field="id_departamento"
          header="ID Departamento asociado"
          style={{ minWidth: "250px" }}
        ></Column>
        <Column header="Acciones" body={accion}></Column>
      </DataTable>
    </div>
  );
};

export default Puestos;
