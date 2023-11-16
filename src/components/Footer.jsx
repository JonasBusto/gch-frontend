import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto d-flex flex-column align-items-center">
      <div className="contain-footer">
        <div className="row m-0">
          <div className="col-12 col-lg-4 col-footer d-flex flex-column">
            <h5>Resumen</h5>
            <div>
              <p>
                La gestión del capital humano (HCM) es un conjunto de prácticas
                y herramientas que se utilizan para atraer, reclutar, capacitar,
                desarrollar, administrar y retener a los empleados para lograr
                los objetivos empresariales.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-footer">
            <h5>Información</h5>
            <div>
              <Link to="/info">Sobre nosotros</Link>
              <p>
                <b>Profesor:</b> Cordero, Lucas
              </p>
              <p>
                <b>Materia:</b> Gestión del Capital Humano
              </p>
              <p>
                <b>Comisión:</b> 5K1
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-footer d-flex justify-content-center">
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/dtccrvpzp/image/upload/v1699624532/Proyecto%20Final/ypdazcpvne7ifuodif7m.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <p>Gestión del Capital Humano - {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
