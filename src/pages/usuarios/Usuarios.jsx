import React, { useState } from "react";
import empleados from "../../helpers/empleados";
import usuarios from "../../helpers/usuarios";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "../../styles/empleados.css";
import { Link } from "react-router-dom";

const Usuarios = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const accion = (usuario) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div className="btn-acciones">
        <Link to={"/usuarios/cargar/" + usuario.id}>
          <i className="fa-solid fa-pencil"></i>
        </Link>
        <button onClick={handleShow}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <Modal className="modal-custom-accion" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{"Eliminar Usuario " + usuario.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"¿Esta seguro de eliminar al empleado '" +
              usuario.nombre_usuario +
              "'?"}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancelar</button>
            <button onClick={handleClose}>Confirmar</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const estado = (usuario) => {
    return (
      <div className="d-flex estado-item">
        <div
          className={usuario.habilitado ? "habilitado" : "no-habilitado"}
        ></div>
        <span>{usuario.habilitado ? "Habilitado" : "Deshabilitado"}</span>
      </div>
    );
  };

  const fieldEstado = (usuario) => {
    let field = "";

    if (usuario.habilitado) {
      field = "Habilitado";
    } else {
      field = "Deshabilitado";
    }

    return field;
  };

  const nombreUsuario = (usuario) => {
    return (
      <div className="name-img-user">
        <img src={usuario.imagen_perfil} alt="foto_perfil" />
        <span>{usuario.nombre_usuario}</span>
      </div>
    );
  };

  const empleadoAsociado = (usuario) => {
    let empleado = empleados.filter((e) => e.id == usuario.id_empleado)[0];

    return (
      <div className="item-asociado">
        <span>
          <Link to={"/empleados/cargar/" + usuario.id_empleado}>
            {"#" +
              empleado.id +
              " - " +
              empleado.apellido +
              ", " +
              empleado.nombre}
          </Link>
        </span>
      </div>
    );
  };

  const fieldEmpleadoAsociado = (usuario) => {
    let empleado = empleados.filter((e) => e.id == usuario.id_empleado)[0];
    let field =
      "#" + empleado.id + " - " + empleado.apellido + ", " + empleado.nombre;

    return field;
  };

  return (
    <div className="container-datatable">
      <div className="d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search">
        <div className="d-flex align-items-center justify-content-between">
          <p>Lista de Usuarios</p>
          <Link to="/usuarios/cargar" className="btn-agregar">
            <i className="me-2 fa-solid fa-plus"></i>Agregar
          </Link>
        </div>
        <InputText
          placeholder="Buscar Usuario"
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
        value={usuarios}
      >
        <Column
          sortable
          field="id"
          header="ID"
          style={{ minWidth: "100px" }}
        ></Column>
        <Column
          sortable
          field="nombre_usuario"
          header="Usuario"
          body={nombreUsuario}
          style={{ minWidth: "300px" }}
        ></Column>
        <Column
          field="contraseña"
          header="Contraseña"
          style={{ minWidth: "250px" }}
        ></Column>
        <Column
          sortable
          field="rol"
          header="Rol"
          style={{ minWidth: "250px" }}
        ></Column>
        <Column
          field={fieldEmpleadoAsociado}
          header="Empleado asociado"
          body={empleadoAsociado}
          style={{ minWidth: "250px" }}
        ></Column>
        <Column
          field={fieldEstado}
          header="Estado"
          style={{ minWidth: "250px" }}
          body={estado}
        ></Column>
        <Column header="Acciones" body={accion}></Column>
      </DataTable>
    </div>
  );
};

export default Usuarios;
