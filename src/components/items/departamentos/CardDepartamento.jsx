import { Link } from 'react-router-dom';

export function CardDepartamento({ departamento }) {
  return (
    <div
      key={departamento.id}
      className='col-12 col-md-6 col-lg-4 col-card-dep'
    >
      <div className='d-flex flex-column card-dep'>
        <div className='card-dep-img'>
          <img
            className='img-fluid'
            src='https://concepto.de/wp-content/uploads/2015/03/desarrollo-organizacional-e1550156922140.jpg'
            alt=''
          />
        </div>
        <div className='card-dep-info d-flex flex-column align-items-center'>
          <div className='w-100'>
            <p>
              <strong>Nombre:</strong> {departamento.name}
            </p>
            <p>
              <strong>Descripción:</strong> {departamento.description}
            </p>
          </div>
          <Link to={'/departamentos-listado/' + departamento.id}>Ingresar</Link>
        </div>
      </div>
    </div>
  );
}
