import { Fragment, useContext, useEffect, useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { Load } from '../../components/items/Load';
import { Link } from 'react-router-dom';
import GchContext from '../../context/GchContext';
import '../../styles/organigrama.css';

export function OrganigramaDepartamentos() {
  const { departamentos, empleados, roles, puestos, niveles } =
    useContext(GchContext);
  const [selection, setSelection] = useState([]);
  const [organigramaObjeto, setOrganigramaObjeto] = useState(null);

  let org = null;
  let arrayOrg = [];
  const createOrganigrama = () => {
    let departamentosJefes = departamentos.filter(
      (dep) => !dep.parentDepartmentId && dep.childDepartmentsId.length > 0
    );
    arrayOrg = [];
    if (departamentosJefes.length === 0) {
      setOrganigramaObjeto([]);
    }
    for (let w = 0; w < departamentosJefes.length; w++) {
      let nivelDep = niveles.filter(
        (rol) => rol.id === departamentosJefes[w].levelId
      )[0];

      org = {
        expanded: true,
        type: 'person',
        data: {
          image:
            'https://concepto.de/wp-content/uploads/2015/03/desarrollo-organizacional-e1550156922140.jpg',
          name: departamentosJefes[w].name,
          title: nivelDep ? nivelDep.name : 'Desconocido',
          id: departamentosJefes[w].id,
        },
        children: [],
      };

      generarChildrenOrg(departamentosJefes[w], org);
      arrayOrg.push(org);
      setOrganigramaObjeto(arrayOrg);
    }
  };

  const generarChildrenOrg = (departamentoFound, objeto) => {
    if (departamentoFound.childDepartmentsId) {
      for (let i = 0; i < departamentoFound.childDepartmentsId.length; i++) {
        let emp = departamentos.filter(
          (emp) => emp.id === departamentoFound.childDepartmentsId[i]
        )[0];

        let nivelDep = niveles.filter((rol) => rol.id === emp.levelId)[0];

        if (emp) {
          let objetoChildren = {
            expanded: true,
            type: 'person',
            data: {
              image:
                'https://concepto.de/wp-content/uploads/2015/03/desarrollo-organizacional-e1550156922140.jpg',
              name: emp.name,
              title: nivelDep ? nivelDep.name : 'Desconocido',
              id: emp.id,
            },
            children: [],
          };
          objeto.children.push(objetoChildren);
          generarChildrenOrg(emp, objetoChildren);
        }
      }
    }
  };

  const nodeTemplate = (node) => {
    if (node.type === 'person') {
      return (
        <Link
          to={'/departamentos-listado/' + node.data.id}
          className='card-organigrama'
        >
          <div>
            <img
              alt={node.data.name}
              src={node.data.image}
              className='mb-3 w-3rem h-3rem'
            />
            <span className='card-org-nombre'>{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </Link>
      );
    }

    return node.label;
  };

  useEffect(() => {
    if (empleados && puestos) {
      createOrganigrama();
    }
  }, [empleados]);

  if (!organigramaObjeto) {
    return <Load />;
  }

  return (
    <div className='card organigrama'>
      <div className='contain-org-chart-titulo'>
        <p>Organigrama de Departamentos</p>
      </div>
      {organigramaObjeto.length > 0 ? (
        organigramaObjeto.map((orgChar) => (
          <Fragment key={crypto.randomUUID()}>
            <OrganizationChart
              value={[orgChar]}
              selectionMode='multiple'
              selection={selection}
              onSelectionChange={(e) => setSelection(e.data)}
              nodeTemplate={nodeTemplate}
            />
            <hr />
          </Fragment>
        ))
      ) : (
        <div className='d-flex justify-content-center'>
          <p>Sin información. Asocie a los departamentos.</p>
        </div>
      )}
    </div>
  );
}
