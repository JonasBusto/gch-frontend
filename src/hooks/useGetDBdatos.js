import { useState, useEffect } from 'react';
import { URL_BACKEND } from '../constants';

export function useGetDBdatos() {
  const [roles, setRoles] = useState(null);
  const [niveles, setNiveles] = useState(null);
  const [departamentos, setDepartamentos] = useState(null);
  const [habilidades, setHabilidades] = useState(null);
  const [puestos, setPuestos] = useState(null);

  const getPuestos = () => {
    fetch(`${URL_BACKEND}positions`)
      .then((resultado) => resultado.json())
      .then((data) => setPuestos([...data]));
  };

  const getRol = () => {
    fetch(`${URL_BACKEND}roles`)
      .then((resultado) => resultado.json())
      .then((data) => setRoles([...data]));
  };

  const getDepartamentos = () => {
    fetch(`${URL_BACKEND}departments`)
      .then((resultado) => resultado.json())
      .then((data) => setDepartamentos([...data]));
  };

  const getNiveles = () => {
    fetch(`${URL_BACKEND}levels`)
      .then((resultado) => resultado.json())
      .then((data) => setNiveles([...data]));
  };

  const getHabilidades = () => {
    fetch(`${URL_BACKEND}skills`)
      .then((resultado) => resultado.json())
      .then((data) => setHabilidades([...data]));
  };

  useEffect(() => {
    getRol();
    getDepartamentos();
    getNiveles();
    getHabilidades();
    getPuestos();
  }, []);

  return {
    roles,
    niveles,
    departamentos,
    habilidades,
    puestos,
  };
}
