import React from "react";
import usuarios from "../helpers/usuarios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import "../styles/empleados.css";

const Empleados = () => {
  return (
    <div className="d-flex">
      <DataTable
        className="p-datatable p-datatable-scrollable p-datatable-header p-datatable-table p-datatable-thead p-datatable-tbody p-datatable-tfoot"
        paginator
        stripedRows
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={usuarios}
        tableStyle={{ minWidth: "30rem" }}
      >
        <Column sortable field="id" header="ID"></Column>
        <Column sortable field="nombre" header="Nombre"></Column>
        <Column sortable field="apellido" header="Apellido"></Column>
        <Column sortable field="email" header="Email"></Column>
        {/* <Column field="telefono" header="Telefono"></Column> */}
        {/* <Column field="direccion" header="Dirección"></Column> */}
      </DataTable>
    </div>
  );
};

export default Empleados;
