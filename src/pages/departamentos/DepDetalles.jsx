import { useParams } from 'react-router-dom';
import { Load } from '../../components/items/Load';
import { useContext } from 'react';
import GchContext from '../../context/GchContext';
import '../../styles/depListado.css';

export function DepDetalles() {
  const { departamentos, niveles, puestos } = useContext(GchContext);
  const { id } = useParams();

  if (!departamentos || !niveles || !puestos) {
    return <Load />;
  }

  let depObjeto = departamentos.filter((d) => d.id == id)[0];
  let depPadre = departamentos.filter(
    (d) => d.id === depObjeto.parentDepartmentId
  )[0];
  let depHijos = departamentos.filter((d) =>
    depObjeto.childDepartmentsId.includes(d.id)
  );
  let depPuestos = puestos.filter((p) => depObjeto.positionsId.includes(p.id));
  let depNivel = niveles.filter((n) => n.id === depObjeto.levelId)[0];

  return (
    <div className='contain-det-emp'>
      <div className='row m-0 p-0'>
        <div className='titulo-det-emp'>
          <p>Detalles del departamento</p>
        </div>
        <div className='col-12 col-md-5'>
          <div className='img-dep-info'>
            <img
              className='img-fluid'
              src='https://concepto.de/wp-content/uploads/2015/03/desarrollo-organizacional-e1550156922140.jpg'
              alt=''
            />
          </div>
        </div>
        <div className='col-12 col-md-7'>
          <div className='row mt-2'>
            <div className='col-12 col-sm-6'>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Nombre del departamento: </b>
                </p>
                <p>{depObjeto.name}</p>
              </div>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Descripción: </b>
                </p>
                <p>{depObjeto.description}</p>
              </div>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Nivel al que corresponde: </b>
                </p>
                <p>
                  {depNivel ? depNivel.name : 'No corresponde a ningun nivel'}
                </p>
              </div>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Depende del departamento: </b>
                </p>
                <p>
                  {depPadre
                    ? depPadre.name
                    : 'No depende de ningun departamento'}
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-6'>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Departamento que dependen de el: </b>
                </p>
                {depHijos.length > 0 ? (
                  <ul>
                    {depHijos.map((d) => (
                      <li key={d.id}>{d.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Ningun departamento depende de este departamento</p>
                )}
              </div>
              <div className='d-flex flex-column detalle-emp'>
                <p>
                  <b>Puestos del departamento: </b>
                </p>
                {depPuestos.length > 0 ? (
                  <ul>
                    {depPuestos.map((p) => (
                      <li key={p.id}>{p.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Este departamento no tiene puestos asociados</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
