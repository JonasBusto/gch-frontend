import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom/dist";
import empleados from "../../helpers/empleados";
import usuarios from "../../helpers/usuarios";
import puestos from "../../helpers/puestos";
import departamentos from "../../helpers/departamentos";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import GchContext from "../../context/GchContext";
import "../../styles/formAM.css";

const FormNiveles = () => {
  const { niveles, departamentos } = useContext(GchContext);

  const { id } = useParams();

  let valuesForm = {
    nombre: "",
    id_departamento: "",
  };

  if (niveles.length == 0) {
    return <h1>Cargando...</h1>;
  }

  if (id) {
    let nivel = niveles.filter((p) => p.id == id)[0];

    valuesForm = {
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

          if (values.nombre.trim() === "") {
            errors.nombre = "Requerido";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log("Nivel: ", values);
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
              <Form.Label className="m-0">Nombre del Nivel</Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese nombre del nivel"
              />

              {touched.nombre && errors.nombre && (
                <Form.Text className="text-muted">{errors.nombre}</Form.Text>
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
                <option value="">No</option>
                {departamentos.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
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

export default FormNiveles;
