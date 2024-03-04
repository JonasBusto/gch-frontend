import { Fragment, useContext, useEffect, useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { Load } from '../../components/items/Load';
import { Link } from 'react-router-dom';
import GchContext from '../../context/GchContext';
import '../../styles/organigrama.css';

export function OrganigramaEmpleados() {
  const { empleados, roles } = useContext(GchContext);
  const [selection, setSelection] = useState([]);
  const [organigramaObjeto, setOrganigramaObjeto] = useState(null);

  let org = null;
  let arrayOrg = [];
  const createOrganigrama = () => {
    let empleadosJefes = empleados.filter(
      (emp) => !emp.supervisorId && emp.subordinatesId.length > 0
    );
    arrayOrg = [];
    if (empleadosJefes.length === 0) {
      setOrganigramaObjeto([]);
    }
    for (let w = 0; w < empleadosJefes.length; w++) {
      let rolEmp = roles.filter(
        (rol) => rol.id === empleadosJefes[w].roleId
      )[0];

      org = {
        expanded: true,
        type: 'person',
        data: {
          image: empleadosJefes[w].profilePicture,
          name: empleadosJefes[w].lastName + ' ' + empleadosJefes[w].firstName,
          title: rolEmp ? rolEmp.name : 'Desconocido',
          id: empleadosJefes[w].id,
        },
        children: [],
      };

      generarChildrenOrg(empleadosJefes[w], org);
      arrayOrg.push(org);
      setOrganigramaObjeto(arrayOrg);
    }
  };

  const generarChildrenOrg = (empleadoFound, objeto) => {
    if (empleadoFound.subordinatesId) {
      for (let i = 0; i < empleadoFound.subordinatesId.length; i++) {
        let emp = empleados.filter(
          (emp) => emp.id === empleadoFound.subordinatesId[i]
        )[0];

        let rolEmp = roles.filter((rol) => rol.id === emp.roleId)[0];

        if (emp) {
          let objetoChildren = {
            expanded: true,
            type: 'person',
            data: {
              image: empleadoFound.profilePicture,
              name: emp.lastName + ' ' + emp.firstName,
              title: rolEmp ? rolEmp.name : 'Desconocido',
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
          to={'/empleados-listado/' + node.data.id}
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
    if (empleados && roles) {
      createOrganigrama();
    }
  }, [empleados]);

  if (!organigramaObjeto) {
    return <Load />;
  }

  return (
    <div className='card organigrama'>
      <div className='contain-org-chart-titulo'>
        <p>Organigrama de Empleados</p>
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
          <p>Sin información. Asocie a los empleados.</p>
        </div>
      )}
    </div>
  );
}
