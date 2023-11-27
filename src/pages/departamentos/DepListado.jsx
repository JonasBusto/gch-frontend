import React from "react";
import { Link } from "react-router-dom";
import departamentos from "../../helpers/departamentos";
import "../../styles/depListado.css";

const DepListado = () => {
  return (
    <div>
      <div className="row m-0">
        {departamentos.map((d) => (
          <div key={d.id} className="col-12 col-md-6 col-lg-4 col-card-dep">
            <div className="d-flex flex-column card-dep">
              <div className="card-dep-img">
                <img className="img-fluid" src={d.img} alt="" />
              </div>
              <div className="card-dep-info d-flex flex-column align-items-center">
                <div className="w-100">
                  <p>{d.nombre}</p>
                  <p>Director: Pepito</p>
                </div>
                <Link to={"/departamentos-listado/" + d.id}>Ingresar</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepListado;
