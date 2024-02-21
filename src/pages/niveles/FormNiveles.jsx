import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom/dist';
import empleados from '../../helpers/empleados';
import usuarios from '../../helpers/usuarios';
import puestos from '../../helpers/puestos';
import departamentos from '../../helpers/departamentos';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import GchContext from '../../context/GchContext';
import { MultiSelect } from 'primereact/multiselect';
import '../../styles/formAM.css';

export function FormNiveles() {
  const { niveles, departamentos, altaNivel, eliminarNivel, modificarNivel } =
    useContext(GchContext);

  const { id } = useParams();

  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectDept, setSelectDept] = useState([]);
  const [deptsLibres, setDeptsLibres] = useState([]);

  let valuesForm = {
    nombre: '',
    id_departamento: [],
  };

  useEffect(() => {
    if (niveles && departamentos) {
      let nivel = niveles.filter((p) => p.id == id)[0];
      let auxDepts = [];
      let deptsNiveles = niveles
        .map((n) =>
          n.departmentsId.map((d) => {
            return d;
          })
        )
        .join()
        .split(',');

      let auxDeptsLibres = departamentos.filter(
        (d) => !deptsNiveles.includes(d.id)
      );
      setDeptsLibres(auxDeptsLibres);
      if (id) {
        // console.log('auxDeptsLibres: ', auxDeptsLibres);

        for (let i = 0; i < nivel.departmentsId.length; i++) {
          for (let j = 0; j < departamentos.length; j++) {
            if (departamentos[j].id === nivel.departmentsId[i]) {
              auxDepts.push(departamentos[j]);
            }
          }
        }
        console.log(auxDepts);
        setSelectDept(auxDepts);
        setSelectedDepts(auxDepts);
      }
    }
  }, [niveles]);

  if (!niveles) {
    return <h1>Cargando...</h1>;
  } else if (!departamentos) {
    return <h1>Cargando...</h1>;
  }

  if (id) {
    let nivel = niveles.filter((p) => p.id == id)[0];

    valuesForm = {
      id: id,
      nombre: nivel.name,
      id_departamento: nivel.departmentsId,
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

          // if (selectDept.length === 0) {
          //   errors.id_departamento = 'Requerido';
          // }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          let arrayAuxDept = selectDept.map((dept) => {
            return dept.id;
          });
          values.id_departamento = arrayAuxDept;

          // console.log(values);

          if (id) {
            modificarNivel(values);
          } else {
            altaNivel(values);
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
            <p>{id ? 'Modificar Puesto' : 'Alta Puesto'}</p>

            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Nombre del Nivel</Form.Label>
              <Form.Control
                type='text'
                id='nombre'
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder='Ingrese nombre del nivel'
              />

              {touched.nombre && errors.nombre && (
                <Form.Text className='text-muted'>{errors.nombre}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className='mb-3 form-multiple-select-custom'>
              <Form.Label>Asociar a Departamentos: </Form.Label>
              <MultiSelect
                name='id_departamento'
                value={selectDept}
                onChange={(e) => setSelectDept(e.target.value)}
                onBlur={handleBlur}
                options={[...deptsLibres, ...selectedDepts]}
                optionLabel='name'
                placeholder='Seleccione Departamentos'
                maxSelectedLabels={5}
              />
              {touched.id_departamento && errors.id_departamento && (
                <Form.Text className='text-muted'>
                  {errors.id_departamento}
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
