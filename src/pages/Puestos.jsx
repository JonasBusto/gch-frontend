import React, { useState } from "react";
import puestos from "../helpers/puestos";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "../styles/empleados.css";
import { Link } from "react-router-dom";

const Puestos = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const accionUsuario = (usuario) => {
    return (
      <div className="btn-acciones">
        <Link to={"/puestos/editar/" + usuario.id}>
          <i className="fa-solid fa-pencil"></i>
        </Link>
        <Link to="">
          <i className="fa-solid fa-trash-can"></i>
        </Link>
      </div>
    );
  };

  const estado = (usuario) => {
    return (
      <div className="d-flex estado-item">
        <div
          className={usuario.habilitado ? "habilitado" : "no-habilitado"}
        ></div>
        <p>{usuario.habilitado ? "Habilitado" : "Deshabilitado"}</p>
      </div>
    );
  };

  return (
    <div className="container-datatable">
      <div className="d-flex flex-column align-items-center justify-content-between p-3 w-100 contain-input-search">
        <div className="d-flex align-items-center justify-content-between">
          <p>Lista de Puestos</p>
          <button className="btn-agregar">
            <i className="me-2 fa-solid fa-plus"></i>Agregar
          </button>
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
        <Column header="Acciones" body={accionUsuario}></Column>
      </DataTable>
    </div>
  );
};

export default Puestos;
