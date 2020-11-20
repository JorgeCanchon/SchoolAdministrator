import React, { Fragment, useEffect, useState } from 'react';
import { Popconfirm, message, Spin } from 'antd';
import CRUDTable from '../../components/CRUDTable';
import { Helmet } from 'react-helmet';
import { GetTeacher, AddPerson, UpdatePerson } from '../../services/personRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addTeacher, setTeachers, updateTeacher } from '../../redux/teacher/index';
import FormPerson from '../../components/FormPerson';

export const Teacher = () => {

  const columns = [
    {
      title: 'Identificacion',
      dataIndex: 'identificacion',
    },
    {
      title: 'Nombre Profesor',
      dataIndex: 'nombreprofesor',
    },
    {
      title: 'Edad',
      dataIndex: 'edad',
    },
    {
      title: 'Direccion',
      dataIndex: 'direccion',
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
    },
    {
      title: 'Editar',
      dataIndex: 'Editar',
      render: (text, record) =>
      teacherState.length >= 1 ? ( <a onClick={() => 
        { 
          const { 
            identificacion,
            nombre,
            apellido,
            direccion,
            rol,
            id,
            telefono,
            edad
          } = record;

          setTeacherSelected({
            identificacion,
            nombre,
            apellido,
            direccion,
            rol,
            id,
            telefono,
            edad
          });

          onVisibleEdit(true);
        }}>Editar</a>) : null,
    }
  ];

  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [teacherState, setTeacherState] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [teacherSelected, setTeacherSelected] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);
  
  const { teacher } = useSelector(
    state => ({
      teacher: state.teacher.teacher
    }),
    shallowEqual
  );

  const getData = async () => {
    setloading(true);
    let data = await GetTeacher();
    switch(data.status)
    {
      case 200:
        data = data.data.payload.map(x =>({ ...x, key: x.id, nombreprofesor: `${x.nombre} ${x.apellido}` }));
        setTeacherState(data);
        dispatch(setTeachers(data));
        break;
      case 204:
        message.warning('No calificaciones disponibles');
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
        break;
    }
    setloading(false);
  }

  const handleOkAdd = async e => {
    let entity = {
      "identificacion": parseInt(e.identificacion),
      "nombre": e.nombre,
      "apellido": e.apellido,
      "edad": parseInt(e.edad),
      "direccion": e.direccion,
      "telefono": parseInt(e.telefono),
      "rol": 0
    };

    let res = await AddPerson(entity);

    switch(res.status){
      case 200:
      case 201:
        res = { id: res.data.payload, ...entity, key: res.data.payload, nombreprofesor: `${entity.nombre} ${entity.apellido}`}
        setTeacherState([...teacherState, res]);
        dispatch(addTeacher(res));
        message.success('Profesor agregado con éxito');
        break;
      default:
          message.error('Ocurrio un error al agregar el profesor');
    }
    setVisibleAdd(false);
  }

  const handleOkEdit = async e => {
    let entity = {
      'id': teacherSelected.id,
      'identificacion': parseInt(e.identificacion),
      'nombre': e.nombre,
      'apellido': e.apellido,
      'edad': parseInt(e.edad),
      'direccion': e.direccion,
      'telefono': parseInt(e.telefono),
      'rol': 0
    };

    let res = await UpdatePerson(entity);

    switch(res.status){
      case 200:
      case 201:
        const data = teacherState.map(x => (
          x.id === entity.id ? { ...entity, key: entity.id, nombreprofesor: `${entity.nombre} ${entity.apellido}` }
          : x
        ))
        setTeacherState(data);
        dispatch(updateTeacher(data));
        message.success('Profesor editado con éxito');
        break;
      default:
          message.error('Ocurrio un error al editar el Profesor');
    }
    setVisibleEdit(false);
  }

  
  const onVisibleAdd = status => setVisibleAdd(status);

  const onVisibleEdit = status => setVisibleEdit(status);

  if (loading)
    return (
      <Fragment>
        <Spin />
      </Fragment>);
  return (
    <Fragment>
      <Helmet title='Profesor' />
      <h1>Profesor</h1>
      <CRUDTable
        columns={columns}
        FormAdd={<FormPerson onFinish={handleOkAdd.bind(this)} />}
        FormEdit={<FormPerson onFinish={handleOkEdit.bind(this)} data={teacherSelected} />}
        state={teacherState}
        loading={loading}
        visibleAdd={visibleAdd}
        visibleEdit={visibleEdit}
        onVisibleAdd={onVisibleAdd.bind(this)}
        onVisibleEdit={onVisibleEdit.bind(this)}
      />
    </Fragment>
  )
}

export default Teacher;