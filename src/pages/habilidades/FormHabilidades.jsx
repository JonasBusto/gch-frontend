import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom/dist";
import empleados from "../../helpers/empleados";
import usuarios from "../../helpers/usuarios";
import puestos from "../../helpers/puestos";
// import departamentos from "../../helpers/departamentos";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import GchContext from "../../context/GchContext";
import "../../styles/formAM.css";

const FormHabilidades = () => {
  const { habilidades, altaHabilidad, modificarHabilidad } =
    useContext(GchContext);

  const { id } = useParams();

  let valuesForm = {
    nombre: "",
    desc: "",
  };

  if (habilidades.length === 0) {
    return <h1>Cargando</h1>;
  }

  if (id) {
    let habilidad = habilidades.filter((d) => d.id == id)[0];

    valuesForm = {
      id: id,
      nombre: habilidad.name,
      desc: habilidad.description,
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

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          // console.log("Departamento: ", values);
          if (id) {
            modificarHabilidad(values);
          } else {
            altaHabilidad(values);
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
          <Form onSubmit={handleSubmit} className="form-am-custom">
            <p>{id ? "Modificar Habilidad" : "Alta Habilidad"}</p>

            <Form.Group className="mb-3">
              <Form.Label className="m-0">Nombre de la habilidad</Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder="Ingrese nombre de la habilidad"
              />

              {touched.nombre && errors.nombre && (
                <Form.Text className="text-muted">{errors.nombre}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="m-0">
                Descripción de la Habilidad
              </Form.Label>
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

export default FormHabilidades;
