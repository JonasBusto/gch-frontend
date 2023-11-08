import React, { useState } from "react";
import { useParams } from "react-router-dom/dist";
import empleados from "../../helpers/empleados";
import usuarios from "../../helpers/usuarios";
import puestos from "../../helpers/puestos";
import departamentos from "../../helpers/departamentos";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import "../../styles/formAM.css";

const FormPuestos = () => {
  const { id } = useParams();

  let valuesForm = {
    nombre: "",
    desc: "",
    salario: "",
    id_departamento: "",
  };

  if (id) {
    let puesto = puestos.filter((p) => p.id == id)[0];

    valuesForm = {
      nombre: puesto.nombre,
      desc: puesto.desc,
      salario: puesto.salario,
      id_departamento: puesto.id_departamento,
    };
  }

  return (
    <div>
      <Formik
        initialValues={valuesForm}
        validate={(values) => {
          let errors = {};

          if (values.nombre.trim() === "") {
            errors.nombre = "Requerido";
          }

          if (values.desc.trim() === "") {
            errors.desc = "Requerido";
          }

          if (values.salario.trim() === "") {
            errors.salario = "Requerido";
          } else if (!/^[+]?([.]\d+|\d+([.]\d+)?)$/.test(values.salario)) {
            errors.salario = "Salario no valido";
          }

          if (values.id_departamento?.toString().trim() === "") {
            errors.id_departamento = "Requerido";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log("Puesto: ", values);
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
            <p>{id ? "Modificar Puesto" : "Alta Puesto"}</p>

            <Form.Group className="mb-3">
              <Form.Label className="m-0">Nombre del Puesto</Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese nombre del puesto"
              />

              {touched.nombre && errors.nombre && (
                <Form.Text className="text-muted">{errors.nombre}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">Descripción del Puesto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                id="desc"
                value={values.desc}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={1000}
                placeholder="Ingrese una descripción"
              />

              {touched.desc && errors.desc && (
                <Form.Text className="text-muted">{errors.desc}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">Salario del Puesto [$]</Form.Label>
              <Form.Control
                type="text"
                id="salario"
                value={values.salario}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={20}
                placeholder="Ingrese salario"
              />

              {touched.salario && errors.salario && (
                <Form.Text className="text-muted">{errors.salario}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Asociar a Departamento: </Form.Label>
              <Form.Select
                name="id_departamento"
                value={values.id_departamento}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccione una opción</option>
                {departamentos.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nombre}
                  </option>
                ))}
              </Form.Select>
              {touched.id_departamento && errors.id_departamento && (
                <Form.Text className="text-muted">
                  {errors.id_departamento}
                </Form.Text>
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

export default FormPuestos;
