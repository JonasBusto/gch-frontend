import '../../styles/load.css';

export function Load() {
  return (
    <div className='spinner'>
      <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div>Cargando...</div>
    </div>
  );
}
