import { createContext } from 'react';
import { useGetDBdatos } from '../hooks/useGetDBdatos';
import {
  altaPuesto,
  eliminarPuesto,
  modificarPuesto,
} from '../services/puestos';
import {
  altaDepartamento,
  eliminarDepartamento,
  modificarDepartamento,
} from '../services/departamentos';
import { altaNivel, eliminarNivel, modificarNivel } from '../services/niveles';
import { altaRol, eliminarRol, modificarRol } from '../services/roles';
import {
  altaHabilidad,
  eliminarHabilidad,
  modificarHabilidad,
} from '../services/habilidades';

const GchContext = createContext();

export function GchProvider({ children }) {
  const { roles, niveles, departamentos, habilidades, puestos } =
    useGetDBdatos();

  return (
    <GchContext.Provider
      value={{
        puestos,
        modificarPuesto,
        eliminarPuesto,
        altaPuesto,
        eliminarHabilidad,
        modificarHabilidad,
        altaHabilidad,
        habilidades,
        eliminarDepartamento,
        departamentos,
        altaDepartamento,
        modificarDepartamento,
        niveles,
        modificarRol,
        altaRol,
        roles,
        eliminarRol,
        altaNivel,
        eliminarNivel,
        modificarNivel,
      }}
    >
      {children}
    </GchContext.Provider>
  );
}

export default GchContext;
