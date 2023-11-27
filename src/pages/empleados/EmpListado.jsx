import React from "react";
import { Link } from "react-router-dom";

import "../../styles/empListado.css";

const EmpListado = () => {
  return (
    <div style={{ width: "100vw", maxWidth: "1300px" }}>
      <div className="row m-0">
        <div className="col-12 col-md-6 col-lg-4 col-emp">
          <div className="d-flex flex-column col-card-emp">
            <div className="card-emp-img d-flex justify-content-center">
              <div></div>
              {/* https://i.ytimg.com/vi/jb0KaJkxq_A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBgjiHOm3yjw4_G56T_PAKtP8qPSA */}
              <img
                className="img-fluid"
                src="https://www.lanacion.com.ar/resizer/v2/elon-U52OA55WTJCJREBI62NJEAHXHA.JPG?auth=d79d6bd9f30deb19eac871d91d1f70b834638ad3653a0ff31b7e7ea6fbe8dbc4&width=420&height=280&quality=70&smart=true"
                alt=""
              />
            </div>
            <div>
              <p>Nombre del empleado</p>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus expedita illum accusantium earum, rerum sapiente
                quasi rem cupiditate facilis, fuga quo fugit! Laboriosam,
                excepturi laudantium culpa blanditiis asperiores ullam
                doloremque?
              </div>
            </div>
            <div>
              <Link to="">Detalle</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpListado;
