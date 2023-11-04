import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import "../styles/loginRegister.css";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const changePass = () => setShowPass(!showPass);

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          pass: "",
        }}
        validate={(values) => {
          let errors = {};

          if (values.email.trim() === "") {
            errors.email = "Requerido";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "Dirección de Email invalida";
          }

          if (values.pass.trim() === "") {
            errors.pass = "Requerido";
          } else if (/\s/.test(values.pass)) {
            errors.pass = "La contraseña no puede tener espacios";
          } else if (
            values.pass.split("").length < 6 ||
            values.pass.split("").length > 14
          ) {
            errors.pass = "Contraseña entre 6 y 14 caracteres";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values.email, values.pass);
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
          <Form onSubmit={handleSubmit} className="form-login-custom">
            <p>Iniciar sesión</p>
            <Form.Group className="mb-3 ">
              <div className="d-flex align-items-center form-group-custom">
                <i className="fa-solid fa-user"></i>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={35}
                />
              </div>
              {touched.email && errors.email && (
                <Form.Text className="text-muted">{errors.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex align-items-center form-group-custom">
                <i
                  style={{ cursor: "pointer" }}
                  onClick={changePass}
                  className={
                    "fa-solid " + (!showPass ? "fa-lock" : "fa-lock-open")
                  }
                ></i>
                <Form.Control
                  type={!showPass ? "password" : "text"}
                  id="pass"
                  value={values.pass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={15}
                  placeholder="Ingrese contraseña"
                />
              </div>
              {touched.pass && errors.pass && (
                <Form.Text className="text-muted">{errors.pass}</Form.Text>
              )}
            </Form.Group>
            <div className="d-flex justify-content-center">
              <button className="btn-login-custom" type="submit">
                Iniciar Sesión
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
