import usuarios from '../helpers/usuarios';
import empleados from '../helpers/empleados';
import '../styles/perfil.css';

export function Perfil() {
  let idArray = 6;

  const logout = () => {};

  return (
    <div style={{ width: '85vw', maxWidth: '1300px' }}>
      <div className='d-flex justify-content-center contain-usuario'>
        <div className='row contain-row-usuario'>
          <div className='col-12'>
            <div className='contain-usuario-img d-flex justify-content-center'>
              <img
                className='img-fluid'
                src={usuarios[idArray].imagen_perfil}
                alt=''
              />
            </div>
            {usuarios[idArray].rol === 'user' ? (
              <div className='rol-usuario-user d-flex justify-content-center align-items-center'>
                <p>Usuario</p>
              </div>
            ) : (
              <div className='rol-usuario-admin d-flex justify-content-center align-items-center'>
                <p>Administrador</p>
              </div>
            )}
            <div className='contain-usuario-info'>
              <div>
                <p>
                  {empleados.filter(
                    (e) => e.id == usuarios[idArray].id_empleado
                  )[0].apellido +
                    ', ' +
                    empleados.filter(
                      (e) => e.id == usuarios[idArray].id_empleado
                    )[0].nombre}
                </p>
              </div>
              <div>
                <p>{usuarios[idArray].nombre_usuario}</p>
              </div>
            </div>
            <div className='d-flex justify-content-center contain-usuario-btn'>
              <button onClick={() => logout()}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
