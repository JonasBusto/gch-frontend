import { useState } from 'react';
import '../../styles/organigrama.css';
import { OrganizationChart } from 'primereact/organizationchart';
import organigrama from '../../helpers/organigrama';

export function Organigrama() {
  const [selection, setSelection] = useState([]);

  const nodeTemplate = (node) => {
    if (node.type === 'person') {
      return (
        <div className='card-organigrama'>
          <div>
            <img
              alt={node.data.name}
              src={node.data.image}
              className='mb-3 w-3rem h-3rem'
            />
            <span className='card-org-nombre'>{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }

    return node.label;
  };

  return (
    <div className='card organigrama'>
      <div className='contain-org-chart-titulo'>
        <p>Organigrama</p>
      </div>
      <OrganizationChart
        value={organigrama}
        selectionMode='multiple'
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data)}
        nodeTemplate={nodeTemplate}
      />
    </div>
  );
}
