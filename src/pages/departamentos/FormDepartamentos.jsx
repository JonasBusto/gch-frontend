import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom/dist';
import { Formik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { Load } from '../../components/items/Load';
import GchContext from '../../context/GchContext';
import Form from 'react-bootstrap/Form';
import '../../styles/formAM.css';

export function FormDepartamentos() {
  const {
    altaDepartamento,
    modificarDepartamento,
    departamentos,
    roles,
    puestos,
    niveles,
  } = useContext(GchContext);

  const { id } = useParams();

  const [deptHijos, setDeptHijos] = useState([]);
  const [rolPuestos, setRolPuestos] = useState([]);

  let valuesForm = {
    nombre: '',
    desc: '',
    nivel_id: '',
    depart_h: [],
    depart_p: '',
    puestos_id: [],
  };

  useEffect(() => {
    if (departamentos && id && puestos) {
      let departamento = departamentos.filter((d) => d.id == id)[0];
      let auxPuestosSelect = puestos.filter((p) =>
        departamento.positionsId.includes(p.id)
      );

      setRolPuestos(auxPuestosSelect);
    }
  }, [departamentos]);

  if (!roles || !niveles || !departamentos || !puestos) {
    return <Load />;
  }

  if (id) {
    let departamento = departamentos.filter((d) => d.id == id)[0];

    valuesForm = {
      id: id,
      nombre: departamento.name,
      desc: departamento.description,
      nivel_id: departamento.levelId ? departamento.levelId : '',
      depart_h: departamento.childDepartmentsId,
      depart_p: departamento.parentDepartmentId
        ? departamento.parentDepartmentId
        : '',
      puestos_id: departamento?.positionsId,
    };
  }

  return (
    <div>
      <Formik
        initialValues={valuesForm}
        validate={(values) => {
          let errors = {};

          if (values.nombre.trim() === '') {
            errors.nombre = 'Requerido';
          }

          if (values.desc.trim() === '') {
            errors.desc = 'Requerido';
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          let arrayAuxDept_h = deptHijos.map((dept) => {
            return dept.id;
          });
          let arrayAuxPuestos = rolPuestos.map((puesto) => {
            return puesto.id;
          });

          values.depart_h = arrayAuxDept_h;
          values.puestos_id = arrayAuxPuestos;
          console.log('Departamento: ', values);
          if (id) {
            modificarDepartamento(values);
          } else {
            altaDepartamento(values);
          }
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit} className='form-am-custom'>
            <p>{id ? 'Modificar Departamento' : 'Alta Departamento'}</p>

            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Nombre del Departamento</Form.Label>
              <Form.Control
                type='text'
                id='nombre'
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder='Ingrese nombre del puesto'
              />

              {touched.nombre && errors.nombre && (
                <Form.Text className='text-muted'>{errors.nombre}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>
                Descripción del Departamento
              </Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                type='text'
                id='desc'
                value={values.desc}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={1000}
                placeholder='Ingrese una descripción'
              />

              {touched.desc && errors.desc && (
                <Form.Text className='text-muted'>{errors.desc}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Asociar a Nivel: </Form.Label>
              <Form.Select
                name='nivel_id'
                value={values.nivel_id}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>No</option>
                {niveles.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </Form.Select>
              {touched.nivel_id && errors.nivel_id && (
                <Form.Text className='text-muted'>{errors.nivel_id}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3 form-multiple-select-custom'>
              <Form.Label>Asociar a Departamento Hijos: </Form.Label>
              <MultiSelect
                name='depart_h'
                value={deptHijos}
                onChange={(e) => setDeptHijos(e.target.value)}
                onBlur={handleBlur}
                options={departamentos}
                optionLabel='name'
                placeholder='Seleccione Departamentos'
                maxSelectedLabels={5}
              />
              {touched.depart_h && errors.depart_h && (
                <Form.Text className='text-muted'>{errors.depart_h}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Asociar a Departamento Padre: </Form.Label>
              <Form.Select
                name='depart_p'
                value={values?.depart_p}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Sin departamento</option>
                {departamentos.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Form.Select>
              {touched.depart_p && errors.depart_p && (
                <Form.Text className='text-muted'>{errors.depart_p}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3 form-multiple-select-custom'>
              <Form.Label>Asociar a Puestos: </Form.Label>

              <MultiSelect
                name='puestos_id'
                value={rolPuestos}
                onChange={(e) => setRolPuestos(e.target.value)}
                onBlur={handleBlur}
                options={puestos}
                optionLabel='name'
                placeholder='Seleccione Puestos'
                maxSelectedLabels={5}
              />
              {touched.puestos_id && errors.puestos_id && (
                <Form.Text className='text-muted'>
                  {errors.puestos_id}
                </Form.Text>
              )}
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <button className='btn-login-custom' type='submit'>
                Cargar información
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
