import React from "react";
import { Link } from "react-router-dom";
import empleados from "../../helpers/empleados";
import roles from "../../helpers/roles";
import { DataView } from "primereact/dataview";
import "../../styles/empListado.css";
import "primeflex/primeflex.css";

const EmpListado = () => {
  const itemTemplate = (e) => {
    return (
      <div key={e.id} className="col-12 col-md-6 col-lg-4 col-emp">
        <div className="d-flex flex-column col-card-emp">
          <div className="card-emp-img d-flex justify-content-center">
            <div></div>
            <img className="img-fluid" src={e.foto_perfil} alt="" />
          </div>
          <div className="col-info-emp-card">
            <div className="d-flex justify-content-center">
              <p>{e.apellido + ", " + e.nombre}</p>
            </div>
            <div className="d-flex justify-content-center">
              <p className="text-center d-flex flex-column">
                <span>
                  <b>{roles.filter((r) => r.id == e.id_rol)[0].nombre_rol}</b>
                </span>
                <span>
                  Supervisado por:{" "}
                  {empleados.filter((r) => r.id == e.id_supervisor)[0]
                    ? empleados.filter((emp) => emp.id == e.id_supervisor)[0]
                        .nombre +
                      ", " +
                      empleados.filter((emp) => emp.id == e.id_supervisor)[0]
                        .apellido
                    : "No tiene"}
                </span>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center col-detalle-emp-card">
            <Link to={"" + e.id}>Detalle</Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: "95vw", maxWidth: "1300px" }}>
      <div className="row m-0"></div>
      <div className="d-flex flex-column contain-list-emp">
        <div>
          <p>Lista de empleados</p>
        </div>
        <DataView
          value={empleados}
          itemTemplate={itemTemplate}
          paginator
          rows={6}
        />
      </div>
    </div>
  );
};

export default EmpListado;
