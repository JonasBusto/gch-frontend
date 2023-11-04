import React from "react";
import Home from "../pages/Home";
import Empleados from "../pages/Empleados";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error404 from "../pages/Erro404";
import { Route, Routes } from "react-router-dom";

const Main = () => {
  return (
    <main className="mt-2 mx-auto" style={{ maxWidth: "1300px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </main>
  );
};

export default Main;
