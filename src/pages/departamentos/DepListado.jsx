import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import departamentos from '../../helpers/departamentos';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import '../../styles/depListado.css';

const DepListado = () => {
  const [filter, setFilter] = useState([]);
  const [inputBuscar, setInputBuscar] = useState('');

  const onChangeInput = (inputBuscar) => {
    let arrayAux = [];
    let arrayAuxDepartamentos = [...departamentos];

    arrayAux = arrayAuxDepartamentos.filter((p) =>
      p.nombre
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(inputBuscar.toLowerCase().trim())
    );

    setFilter([...arrayAux]);
  };

  useEffect(() => {
    onChangeInput(inputBuscar);
  }, [inputBuscar]);

  useEffect(() => {
    setFilter([...departamentos]);
  }, []);

  const itemTemplate = (d) => {
    return (
      <div key={d.id} className='col-12 col-md-6 col-lg-4 col-card-dep'>
        <div className='d-flex flex-column card-dep'>
          <div className='card-dep-img'>
            <img className='img-fluid' src={d.img} alt='' />
          </div>
          <div className='card-dep-info d-flex flex-column align-items-center'>
            <div className='w-100'>
              <p>{d.nombre}</p>
              <p>Director: Pepito</p>
            </div>
            <Link to={'/departamentos-listado/' + d.id}>Ingresar</Link>
          </div>
        </div>
      </div>
    );
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
};

export default DepListado;
