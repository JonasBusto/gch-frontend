import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom/dist';
import empleados from '../../helpers/empleados';
// import roles from "../../helpers/roles";
import usuarios from '../../helpers/usuarios';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import '../../styles/formAM.css';
import GchContext from '../../context/GchContext';
import departamentos from '../../helpers/departamentos';
import { MultiSelect } from 'primereact/multiselect';

export function FormRoles() {
  const { altaRol, roles, departamentos, modificarRol, puestos, niveles } =
    useContext(GchContext);
  const { id } = useParams();

  let valuesForm = {
    nombre_rol: '',
    desc_rol: '',
  };

  if (!roles) {
    return <h1>Cargando</h1>;
  }

  if (id) {
    let rol = roles?.filter((r) => r.id == id)[0];

    valuesForm = {
      id: id,
      nombre_rol: rol?.name,
      desc_rol: rol?.description,
    };
  }

  return (
    <div>
      {' '}
      <Formik
        initialValues={valuesForm}
        validate={(values) => {
          let errors = {};

          if (values.nombre_rol.trim() === '') {
            errors.nombre_rol = 'Requerido';
          }

          if (values.desc_rol.trim() === '') {
            errors.desc_rol = 'Requerido';
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log('Rol: ', values);
          if (id) {
            modificarRol(values);
          } else {
            altaRol(values);
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
            <p>{id ? 'Modificar Rol' : 'Alta Rol'}</p>

            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Nombre del Rol</Form.Label>
              <Form.Control
                type='text'
                id='nombre_rol'
                value={values.nombre_rol}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={200}
                placeholder='Ingrese nombre del rol'
              />

              {touched.nombre_rol && errors.nombre_rol && (
                <Form.Text className='text-muted'>
                  {errors.nombre_rol}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Descripción del Rol</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                type='text'
                id='desc_rol'
                value={values.desc_rol}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={1000}
                placeholder='Ingrese descripcion del rol'
              />

              {touched.desc_rol && errors.desc_rol && (
                <Form.Text className='text-muted'>{errors.desc_rol}</Form.Text>
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
