import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom/dist';
import empleados from '../../helpers/empleados';
import roles from '../../helpers/roles';
import AppContext from '../../context/GchContext';
import puestos from '../../helpers/puestos';
import usuarios from '../../helpers/usuarios';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import '../../styles/formAM.css';

export function FormEmpleados() {
  const { id } = useParams();
  const {
    roles,
    puestos,
    habilidades,
    usuarios,
    altaEmpleado,
    empleados,
    eliminarEmpleado,
    modificarEmpleado,
  } = useContext(AppContext);
  const [selectHabilidades, setSelectHabilidades] = useState([]);
  const [selectSubordinados, setSelectSubordinados] = useState([]);
  // const [habSelect, habSelect] = useState([])

  let valuesForm = {
    nombre: '',
    apellido: '',
    dni: '',
    foto_perfil:
      'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
    direccion: '',
    fecha_nac: '',
    habilitado: false,
    email: '',
    telefono: '',
    id_rol: '',
    id_puesto: '',
    id_supervisor: '',
    id_subordinados: [],
    id_habilidades: [],
    id_usuario: '',
  };

  useEffect(() => {
    if (empleados && habilidades && id) {
      let empleado = empleados.filter((e) => e.id == id)[0];
      let auxHabSelected = habilidades.filter((h) =>
        empleado.skillsId.includes(h.id)
      );
      // console.log(empleado);
      setSelectHabilidades(auxHabSelected);
    }
  }, [empleados]);

  if (!roles) {
    return <h1>Cargando</h1>;
  } else if (!habilidades) {
    return <h1>Cargando</h1>;
  } else if (!puestos) {
    return <h1>Cargando</h1>;
  } else if (!usuarios) {
    return <h1>Cargando</h1>;
  } else if (!empleados) {
    return <h1>Cargando</h1>;
  }

  if (id) {
    let empleado = empleados.filter((e) => e.id == id)[0];
    let fecha = empleado.birthDate;

    const [dia, mes, año] = fecha.split('-');

    valuesForm = {
      id: id,
      nombre: empleado.firstName,
      apellido: empleado.lastName,
      dni: empleado.dni,
      foto_perfil: empleado.profilePicture ? empleado.profilePicture : '',
      direccion: empleado.address,
      fecha_nac: año + '-' + mes + '-' + dia,
      habilitado: empleado.active,
      email: empleado.mail,
      telefono: empleado.phoneNumber,
      id_rol: empleado.roleId ? empleado.roleId : '',
      id_puesto: empleado.positionId ? empleado.positionId : '',
      id_supervisor: empleado.supervisorId ? empleado.supervisorId : '',
      id_subordinados: empleado.subordinatesId,
      id_habilidades: empleado.skillsId,
      id_usuario: empleado.userId ? empleado.userId : '',
    };
    // console.log('fecha: ', valuesForm.id);
    // console.log('fecha: ', empleado);
  }

  const valueInput = (empleado) => {
    let nombreCompleto = empleado.lastName + ', ' + empleado.firstName;
    return nombreCompleto;
  };

  return (
    <div>
      {' '}
      <Formik
        initialValues={valuesForm}
        validate={(values) => {
          let errors = {};

          if (values.nombre.trim() === '') {
            errors.nombre = 'Requerido';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nombre)) {
            errors.nombre = 'Ingrese nombre valido';
          }

          if (values.apellido.trim() === '') {
            errors.apellido = 'Requerido';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.apellido)) {
            errors.apellido = 'Ingrese apellido valido';
          }

          if (values.dni.trim() === '') {
            errors.dni = 'Requerido';
          } else if (!/^\d{7,8}(?:[-\s]\d{4})?$/.test(values.dni)) {
            errors.dni = 'Ingrese DNI valido';
          }

          if (values.foto_perfil.trim() === '') {
            errors.foto_perfil = 'Requerido';
          } else if (
            !/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/.test(
              values.foto_perfil
            )
          ) {
            errors.foto_perfil = 'URL no valida';
          }

          if (values.direccion.trim() === '') {
            errors.direccion = 'Requerido';
          }

          if (values.fecha_nac.trim() === '') {
            errors.fecha_nac = 'Requerido';
          }

          if (values.email.trim() === '') {
            errors.email = 'Requerido';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = 'Dirección de Email invalida';
          }

          if (values.telefono.trim() === '') {
            errors.telefono = 'Requerido';
          }

          // if (values.id_puesto.toString().trim() === '') {
          //   errors.id_puesto = 'Requerido';
          // }

          // if (values.id_rol.toString().trim() === '') {
          //   errors.id_rol = 'Requerido';
          // }

          if (selectHabilidades.length === 0) {
            errors.id_habilidades = 'Requerido';
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          let arrayAuxHab = selectHabilidades.map((h) => {
            return h.id;
          });
          let arrayAuxSub = selectSubordinados.map((h) => {
            return h.id;
          });

          let fecha = values.fecha_nac;
          console.log('fecha submit: ', fecha);
          const [año, mes, dia] = fecha.split('-');
          values.fecha_nac = dia + '-' + mes + '-' + año;

          values.id_habilidades = arrayAuxHab;
          values.id_subordinados = arrayAuxSub;
          if (id) {
            modificarEmpleado(values);
          } else {
            altaEmpleado(values);
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
            <p>{id ? 'Modificar empleado' : 'Alta Empleado'}</p>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>URL Foto Perfil</Form.Label>
              <div className='d-flex justify-content-center align-items-center img-prev-form'>
                <img
                  className='img-fluid'
                  src={values.foto_perfil}
                  alt='img-prev-form'
                />
              </div>
              <Form.Control
                type='text'
                id='foto_perfil'
                value={values.foto_perfil}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Ingrese URL'
              />

              {touched.foto_perfil && errors.foto_perfil && (
                <Form.Text className='text-muted'>
                  {errors.foto_perfil}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Nombre/s del empleado</Form.Label>
              <Form.Control
                type='text'
                id='nombre'
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder='Ingrese nombre/s'
              />

              {touched.nombre && errors.nombre && (
                <Form.Text className='text-muted'>{errors.nombre}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Apellido/s del empleado</Form.Label>
              <Form.Control
                type='text'
                id='apellido'
                value={values.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder='Ingrese apellido/s'
              />

              {touched.apellido && errors.apellido && (
                <Form.Text className='text-muted'>{errors.apellido}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>DNI del empleado</Form.Label>
              <Form.Control
                type='text'
                id='dni'
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={15}
                placeholder='Ingrese DNI'
              />

              {touched.dni && errors.dni && (
                <Form.Text className='text-muted'>{errors.dni}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Dirección del empleado</Form.Label>
              <Form.Control
                type='text'
                id='direccion'
                value={values.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder='Ingrese direccion'
              />

              {touched.direccion && errors.direccion && (
                <Form.Text className='text-muted'>{errors.direccion}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>
                Fecha nacimiento del empleado
              </Form.Label>
              <Form.Control
                type='date'
                id='fecha_nac'
                value={values.fecha_nac}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder='Ingrese fecha nacimiento'
              />

              {touched.fecha_nac && errors.fecha_nac && (
                <Form.Text className='text-muted'>{errors.fecha_nac}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name='habilitado'
                value={values.habilitado}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={false}>Deshabilitado</option>
                <option value={true}>Habilitado</option>
              </Form.Select>
              {touched.habilitado && errors.habilitado && (
                <Form.Text className='text-muted'>
                  {errors.habilitado}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Email del empleado</Form.Label>
              <Form.Control
                type='text'
                id='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder='Ingrese email'
              />

              {touched.email && errors.email && (
                <Form.Text className='text-muted'>{errors.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='m-0'>Telefono del empleado</Form.Label>
              <Form.Control
                type='text'
                id='telefono'
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                placeholder='Ingrese telefono'
              />

              {touched.telefono && errors.telefono && (
                <Form.Text className='text-muted'>{errors.telefono}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Rol del Empleado</Form.Label>
              <Form.Select
                name='id_rol'
                value={values.id_rol}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Sin Rol</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Form.Select>
              {touched.id_rol && errors.id_rol && (
                <Form.Text className='text-muted'>{errors.id_rol}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Puesto del Empleado</Form.Label>
              <Form.Select
                name='id_puesto'
                value={values.id_puesto}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Sin Puesto</option>
                {puestos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
              {touched.id_puesto && errors.id_puesto && (
                <Form.Text className='text-muted'>{errors.id_puesto}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Es supervisado por: </Form.Label>
              <Form.Select
                name='id_supervisor'
                value={values.id_supervisor}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Nadie</option>
                {empleados.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName}
                  </option>
                ))}
              </Form.Select>
              {touched.id_supervisor && errors.id_supervisor && (
                <Form.Text className='text-muted'>
                  {errors.id_supervisor}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3 form-multiple-select-custom'>
              <Form.Label>Supervisa a: </Form.Label>
              <MultiSelect
                name='id_subordinados'
                value={selectSubordinados}
                onChange={(e) => setSelectSubordinados(e.target.value)}
                onBlur={handleBlur}
                options={empleados}
                optionLabel={valueInput}
                placeholder='Seleccione Subordinados'
                maxSelectedLabels={5}
              />

              {touched.id_subordinados && errors.id_subordinados && (
                <Form.Text className='text-muted'>
                  {errors.id_subordinados}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3 form-multiple-select-custom'>
              <Form.Label>Habilidades: </Form.Label>
              <MultiSelect
                name='id_habilidades'
                value={selectHabilidades}
                onChange={(e) => setSelectHabilidades(e.target.value)}
                onBlur={handleBlur}
                options={habilidades}
                optionLabel='name'
                placeholder='Seleccione Habilidades'
                maxSelectedLabels={5}
              />

              {touched.id_habilidades && errors.id_habilidades && (
                <Form.Text className='text-muted'>
                  {errors.id_habilidades}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Usuario del Sistema:</Form.Label>
              <Form.Select
                name='id_usuario'
                value={values.id_usuario}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Seleccione una opción</option>
                {usuarios.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.username}
                  </option>
                ))}
              </Form.Select>
              {touched.id_usuario && errors.id_usuario && (
                <Form.Text className='text-muted'>
                  {errors.id_usuario}
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
}
