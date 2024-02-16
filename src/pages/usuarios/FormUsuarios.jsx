import React, { useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import empleados from '../../helpers/empleados';
import usuarios from '../../helpers/usuarios';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import '../../styles/formAM.css';

const FormUsuarios = () => {
  const { id } = useParams();

  let valuesForm = {
    id_empleado: '',
    nombre_usuario: '',
    contraseña: '',
    rol: 'user',
    imagen_perfil: '',
    habilitado: false,
  };

  if (id) {
    let usuario = usuarios.filter((e) => e.id == id)[0];

    valuesForm = {
      id_empleado: usuario.id_empleado,
      nombre_usuario: usuario.nombre_usuario,
      contraseña: usuario.contraseña,
      rol: usuario.rol,
      imagen_perfil: usuario.imagen_perfil,
      habilitado: usuario.habilitado,
    };
  }

  return (
    <div>
      {' '}
      <Formik
        initialValues={valuesForm}
        validate={(values) => {
          let errors = {};

          if (values.nombre_usuario.trim() === '') {
            errors.nombre_usuario = 'Requerido';
          }

          if (values.contraseña.trim() === '') {
            errors.contraseña = 'Por favor ingrese una contraseña.';
          } else if (/\s/.test(values.contraseña)) {
            errors.contraseña = 'La contraseña no puede tener espacios.';
          } else if (
            values.contraseña.split('').length < 8 ||
            values.contraseña.split('').length > 14
          ) {
            errors.contraseña =
              'La contraseña debe tener entre 8 y 14 caracteres.';
          }

          if (values.imagen_perfil.trim() === '') {
            errors.imagen_perfil = 'Requerido';
          } else if (
            !/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/.test(
              values.imagen_perfil
            )
          ) {
            errors.imagen_perfil = 'URL no valida';
          }

          if (values.id_empleado?.toString().trim() === '') {
            errors.id_empleado = 'Requerido';
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log('Usuario: ', values);
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
            <p>{id ? 'Modificar Usuario' : 'Alta Usuario'}</p>

            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Nombre de Usuario</Form.Label>
              <Form.Control
                type='text'
                id='nombre_usuario'
                value={values.nombre_usuario}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={20}
                placeholder='Ingrese nombre de usuario'
              />

              {touched.nombre_usuario && errors.nombre_usuario && (
                <Form.Text className='text-muted'>
                  {errors.nombre_usuario}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Contraseña del Usuario</Form.Label>
              <Form.Control
                type='text'
                id='contraseña'
                value={values.contraseña}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={20}
                placeholder='Ingrese contraseña'
              />

              {touched.contraseña && errors.contraseña && (
                <Form.Text className='text-muted'>
                  {errors.contraseña}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>URL Imagen Perfil</Form.Label>
              <div className='d-flex justify-content-center align-items-center img-prev-form'>
                <img
                  className='img-fluid'
                  src={values.imagen_perfil}
                  alt='img-prev-form'
                />
              </div>
              <Form.Control
                type='text'
                id='imagen_perfil'
                value={values.imagen_perfil}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Ingrese URL'
              />

              {touched.imagen_perfil && errors.imagen_perfil && (
                <Form.Text className='text-muted'>
                  {errors.imagen_perfil}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Estado del Usuario</Form.Label>
              <Form.Select
                name='habilitado'
                value={values.habilitado}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={true}>Habilitado</option>
                <option value={false}>Deshabilitado</option>
              </Form.Select>
              {touched.habilitado && errors.habilitado && (
                <Form.Text className='text-muted'>
                  {errors.habilitado}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Asociar a Empleado: </Form.Label>
              <Form.Select
                name='id_empleado'
                value={values.id_empleado}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Seleccione una opción</option>
                {empleados.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.apellido + ', ' + e.nombre}
                  </option>
                ))}
              </Form.Select>
              {touched.id_empleado && errors.id_empleado && (
                <Form.Text className='text-muted'>
                  {errors.id_empleado}
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
};

export default FormUsuarios;
