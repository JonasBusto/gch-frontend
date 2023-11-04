import React from "react";
import usuarios from "../helpers/usuarios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../styles/empleados.css";

const Empleados = () => {
  return (
    <div className="d-flex">
      <DataTable
        className="p-datatable p-datatable-scrollable p-datatable-header p-datatable-table p-datatable-thead p-datatable-tbody p-datatable-tfoot"
        paginator
        removableSort
        selectionMode="single"
        scrollHeight="400px"
        rows={5}
        scrollable
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={usuarios}
      >
        <Column sortable field="id" header="ID"></Column>
        <Column sortable field="nombre" header="Nombre"></Column>
        <Column sortable field="apellido" header="Apellido"></Column>
        <Column sortable field="email" header="Email"></Column>
        <Column field="telefono" header="Telefono"></Column>
        <Column field="direccion" header="Dirección"></Column>
        <Column header="Dirección">
          <button>ce</button>
        </Column>
      </DataTable>
    </div>
  );
};

export default Empleados;
