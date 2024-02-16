import React from 'react';
import { useParams } from 'react-router-dom';
import departamentos from '../../helpers/departamentos';
import '../../styles/depListado.css';

const DepDetalles = () => {
  const { id } = useParams();

  let depObjeto = departamentos.filter((d) => d.id == id)[0];

  return (
    <div className='contain-det-emp'>
      <div className='row m-0 p-0'>
        <div className='titulo-det-emp'>
          <p>Detalles del departamento</p>
        </div>
        <div className='col-5'>
          <div className='img-dep-info'>
            <img className='img-fluid' src={depObjeto.img} alt='' />
          </div>
        </div>
        <div className='col-7'>
          <div className='d-flex flex-column'>
            <div className='titulo-dep-info'>
              <p>{depObjeto.nombre}</p>
            </div>
            <div className='titulo2-dep-info'>
              <p>Director: Pepito</p>
            </div>
            <div className='mt-3'>
              <p>{depObjeto.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepDetalles;
