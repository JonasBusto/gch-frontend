import { useParams } from 'react-router-dom';
import { Load } from '../../components/items/Load';
import { useContext } from 'react';
import GchContext from '../../context/GchContext';
import '../../styles/depListado.css';

export function DepDetalles() {
  const { departamentos } = useContext(GchContext);
  const { id } = useParams();

  if (!departamentos) {
    return <Load />;
  }

  let depObjeto = departamentos.filter((d) => d.id == id)[0];

  return (
    <div className='contain-det-emp'>
      <div className='row m-0 p-0'>
        <div className='titulo-det-emp'>
          <p>Detalles del departamento</p>
        </div>
        <div className='col-5'>
          <div className='img-dep-info'>
            <img
              className='img-fluid'
              src='https://concepto.de/wp-content/uploads/2015/03/desarrollo-organizacional-e1550156922140.jpg'
              alt=''
            />
          </div>
        </div>
        <div className='col-7'>
          <div className='d-flex flex-column'>
            <div className='titulo-dep-info'>
              <p>{depObjeto.name}</p>
            </div>
            <div className='mt-3'>
              <p>{depObjeto.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
