import nosotros from '../helpers/nosotros';
import '../styles/nosotros.css';

export function Nosotros() {
  function compare(obj1, obj2) {
    if (obj1.apellido > obj2.apellido) {
      return 1;
    } else if (obj1.apellido < obj2.apellido) {
      return -1;
    } else {
      return 0;
    }
  }

  return (
    <div>
      <div className='row m-0 justify-content-md-center'>
        {nosotros.sort(compare).map((n) => (
          <div key={n.id} className='col-6 col-md-4 card-info-nosotros'>
            <div className='d-flex flex-column'>
              <div className='d-flex justify-content-center'>
                <img className='img-fluid' src={n.foto_perfil} alt='' />
              </div>
              <div className='mt-2 d-flex flex-column align-items-center'>
                <p>{n.apellido + ', ' + n.nombre}</p>

                <a className='email-info' href={'mailto:' + n.email}>
                  {n.email}
                </a>
                <p className='info-legajo'>{n.legajo}</p>
                <p className='rol-info'>{n.rol_equipo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
