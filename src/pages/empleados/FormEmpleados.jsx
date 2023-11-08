import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom/dist";
import empleados from "../../helpers/empleados";
import roles from "../../helpers/roles";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import "../../styles/formAM.css";

const FormEmpleados = () => {
  const { id } = useParams();

  let valuesForm = {
    nombre: "",
    apellido: "",
    foto_perfil: "",
    direccion: "",
    fecha_nac: "",
    sexo: "",
    email: "",
    telefono: "",
    id_rol: "",
    id_supervisor: "",
  };

  if (id) {
    let empleado = empleados.filter((e) => e.id == id)[0];

    valuesForm = {
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      foto_perfil: empleado.foto_perfil,
      direccion: empleado.direccion,
      fecha_nac: empleado.fecha_nac,
      sexo: empleado.sexo,
      email: empleado.email,
      telefono: empleado.telefono,
      id_rol: empleado.id_rol,
      id_supervisor: empleado.id_supervisor,
    };
  }

  return (
    <div>
      {" "}
      <Formik
        initialValues={valuesForm}
        validate={(values) => {
          let errors = {};

          if (values.nombre.trim() === "") {
            errors.nombre = "Requerido";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nombre)) {
            errors.nombre = "Ingrese nombre valido";
          }

          if (values.apellido.trim() === "") {
            errors.apellido = "Requerido";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.apellido)) {
            errors.apellido = "Ingrese apellido valido";
          }

          if (values.foto_perfil.trim() === "") {
            errors.foto_perfil = "Requerido";
          } else if (
            !/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/.test(
              values.foto_perfil
            )
          ) {
            errors.foto_perfil = "URL no valida";
          }

          if (values.direccion.trim() === "") {
            errors.direccion = "Requerido";
          }

          if (values.fecha_nac.trim() === "") {
            errors.fecha_nac = "Requerido";
          }

          if (values.sexo.trim() === "") {
            errors.sexo = "Requerido";
          }

          if (values.email.trim() === "") {
            errors.email = "Requerido";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "Dirección de Email invalida";
          }

          if (values.telefono.trim() === "") {
            errors.telefono = "Requerido";
          }

          if (values.id_rol.toString().trim() === "") {
            errors.id_rol = "Requerido";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log("Empleado: ", values);
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
          <Form onSubmit={handleSubmit} className="form-am-custom">
            <p>{id ? "Modificar empleado" : "Alta Empleado"}</p>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">URL Foto Perfil</Form.Label>
              <div className="d-flex justify-content-center align-items-center img-prev-form">
                <img
                  className="img-fluid"
                  src={values.foto_perfil}
                  alt="img-prev-form"
                />
              </div>
              <Form.Control
                type="text"
                id="foto_perfil"
                value={values.foto_perfil}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese URL"
              />

              {touched.foto_perfil && errors.foto_perfil && (
                <Form.Text className="text-muted">
                  {errors.foto_perfil}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">Nombre/s del empleado</Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese nombre/s"
              />

              {touched.nombre && errors.nombre && (
                <Form.Text className="text-muted">{errors.nombre}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">Apellido/s del empleado</Form.Label>
              <Form.Control
                type="text"
                id="apellido"
                value={values.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese apellido/s"
              />

              {touched.apellido && errors.apellido && (
                <Form.Text className="text-muted">{errors.apellido}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">Dirección del empleado</Form.Label>
              <Form.Control
                type="text"
                id="direccion"
                value={values.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese direccion"
              />

              {touched.direccion && errors.direccion && (
                <Form.Text className="text-muted">{errors.direccion}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">
                Fecha nacimiento del empleado
              </Form.Label>
              <Form.Control
                type="date"
                id="fecha_nac"
                value={values.fecha_nac}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese fecha nacimiento"
              />

              {touched.fecha_nac && errors.fecha_nac && (
                <Form.Text className="text-muted">{errors.fecha_nac}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sexo del Empleado</Form.Label>
              <Form.Select
                name="sexo"
                value={values.sexo}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccione</option>
                <option value="h">Hombre</option>
                <option value="m">Mujer</option>
              </Form.Select>
              {touched.sexo && errors.sexo && (
                <Form.Text className="text-muted">{errors.sexo}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">Email del empleado</Form.Label>
              <Form.Control
                type="text"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese email"
              />

              {touched.email && errors.email && (
                <Form.Text className="text-muted">{errors.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">Telefono del empleado</Form.Label>
              <Form.Control
                type="text"
                id="telefono"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese telefono"
              />

              {touched.telefono && errors.telefono && (
                <Form.Text className="text-muted">{errors.telefono}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol del Empleado</Form.Label>
              <Form.Select
                name="id_rol"
                value={values.id_rol}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccione una opción</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre_rol}
                  </option>
                ))}
              </Form.Select>
              {touched.id_rol && errors.id_rol && (
                <Form.Text className="text-muted">{errors.id_rol}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Es supervisado por: </Form.Label>
              <Form.Select
                name="id_supervisor"
                value={values.id_supervisor}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Nadie</option>
                {empleados.map(
                  (s) =>
                    s.id != id && (
                      <option key={s.id} value={s.id}>
                        {"" + s.rol + " - " + s.apellido + ", " + s.nombre + ""}
                      </option>
                    )
                )}
              </Form.Select>
              {touched.sexo && errors.sexo && (
                <Form.Text className="text-muted">{errors.sexo}</Form.Text>
              )}
            </Form.Group>
            <div className="d-flex justify-content-center">
              <button className="btn-login-custom" type="submit">
                Cargar información
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormEmpleados;