import React, { useState } from "react";
import usuarios from "../helpers/usuarios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "../styles/empleados.css";
import { Link } from "react-router-dom";

const Usuarios = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const accionUsuario = (usuario) => {
    return (
      <div className="btn-acciones">
        <Link to={"/usuarios/editar/" + usuario.id}>
          <i className="fa-solid fa-pencil"></i>
        </Link>
        <Link to="">
          <i className="fa-solid fa-trash-can"></i>
        </Link>
      </div>
    );
  };

  const estado = (empleado) => {
    return (
      <div className="d-flex estado-item">
        <div
          className={empleado.habilitado ? "habilitado" : "no-habilitado"}
        ></div>
        <p>{empleado.habilitado ? "Habilitado" : "Deshabilitado"}</p>
      </div>
    );
  };

  const nombreUsuario = (usuario) => {
    return (
      <div className="name-img-user">
        <img src={usuario.imagen_perfil} alt="foto_perfil" />
        <span>{usuario.nombre_usuario}</span>
      </div>
    );
  };

  return (
    <div className="container-datatable">
      <div className="d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search">
        <div className="d-flex align-items-center justify-content-between">
          <p>Lista de Usuarios</p>
          <button className="btn-agregar">
            <i className="me-2 fa-solid fa-plus"></i>Agregar
          </button>
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
          sortable
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
          sortable
          field="id_empleado"
          header="ID Empleado asociado"
          style={{ minWidth: "250px" }}
        ></Column>
        <Column
          field="habilitado"
          header="Estado"
          style={{ minWidth: "250px" }}
          body={estado}
        ></Column>
        <Column header="Acciones" body={accionUsuario}></Column>
      </DataTable>
    </div>
  );
};

export default Usuarios;
