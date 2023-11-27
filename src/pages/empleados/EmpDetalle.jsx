import React from "react";
import { useParams } from "react-router-dom";
import empleados from "../../helpers/empleados";
import roles from "../../helpers/roles";
import "../../styles/empDetalle.css";

const EmpDetalle = () => {
  const { id } = useParams();
  const empleadoObjeto = empleados.filter((e) => e.id == id)[0];

  return (
    <div className="d-flex flex-column">
      <div className="contain-det-emp">
        <div className="titulo-det-emp">
          <p>Detalles del empleado</p>
        </div>
        <div className="row m-0">
          <div className="col-6 col-lg-4 img-det-emp">
            <img
              className="img-fluid"
              src={empleadoObjeto.foto_perfil}
              alt=""
            />
          </div>
          <div className="col-6 col-lg-4">
            <div className="d-flex flex-column">
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Nombre completo: </b>
                </p>
                <p>{empleadoObjeto.apellido + ", " + empleadoObjeto.nombre}</p>
              </div>
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Fecha Nacimiento: </b>
                </p>
                <p>{empleadoObjeto.fecha_nac}</p>
              </div>
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Email: </b>
                </p>
                <a href={"mailto:" + empleadoObjeto.email}>
                  {empleadoObjeto.email}
                </a>
              </div>
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Telefono: </b>
                </p>
                <p>{empleadoObjeto.telefono}</p>
              </div>
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Dirección: </b>
                </p>
                <p>{empleadoObjeto.direccion}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column">
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Sexo: </b>
                </p>
                <p>{empleadoObjeto.sexo == "h" ? "Hombre" : "Mujer"}</p>
              </div>
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Puesto: </b>
                </p>
                <p>
                  {
                    roles.filter((r) => r.id == empleadoObjeto.id_rol)[0]
                      .nombre_rol
                  }
                </p>
              </div>
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Descripción del puesto: </b>
                </p>
                <p>
                  {
                    roles.filter((r) => r.id == empleadoObjeto.id_rol)[0]
                      .desc_rol
                  }
                </p>
              </div>
              <div className="d-flex flex-column detalle-emp">
                <p>
                  <b>Supervisado por: </b>
                </p>
                <p>
                  {empleados.filter(
                    (r) => r.id == empleadoObjeto.id_supervisor
                  )[0]
                    ? empleados.filter(
                        (r) => r.id == empleadoObjeto.id_supervisor
                      )[0].apellido +
                      ", " +
                      empleados.filter(
                        (r) => r.id == empleadoObjeto.id_supervisor
                      )[0].nombre
                    : "No tiene supervisor"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDetalle;
