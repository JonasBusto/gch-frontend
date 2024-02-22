import { useState, useEffect, useContext } from 'react';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { Load } from '../../components/items/Load';
import { CardDepartamento } from '../../components/items/departamentos/CardDepartamento';
import GchContext from '../../context/GchContext';
import '../../styles/depListado.css';

export function DepListado() {
  const { departamentos } = useContext(GchContext);
  const [filter, setFilter] = useState([]);
  const [inputBuscar, setInputBuscar] = useState('');

  const onChangeInput = (inputBuscar) => {
    let arrayAux = [];

    arrayAux =
      departamentos?.filter((p) =>
        p.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(inputBuscar.toLowerCase().trim())
      ) || [];

    setFilter([...arrayAux]);
  };

  useEffect(() => {
    onChangeInput(inputBuscar);
  }, [inputBuscar]);

  useEffect(() => {
    if (departamentos) {
      setFilter([...departamentos]);
    }
  }, [departamentos]);

  if (!departamentos) {
    return <Load />;
  }

  const itemTemplate = (departamento) => {
    return <CardDepartamento departamento={departamento} />;
  };

  return (
    <div style={{ width: '95vw', maxWidth: '1300px' }}>
      <div className='row m-0'></div>
      <div className='d-flex flex-column contain-list-emp'>
        <div className='w-100 contain-header-listado'>
          <p>Lista de departamentos</p>
          <div className='mx-3 mb-3'>
            <InputText
              onChange={(e) => setInputBuscar(e.target.value)}
              placeholder='Buscar Departamentos'
              onInput={(e) => {}}
            />
          </div>
        </div>
        <DataView
          value={filter}
          itemTemplate={itemTemplate}
          paginator
          emptyMessage='Sin resultados'
          rows={6}
        />
      </div>
    </div>
  );
}
