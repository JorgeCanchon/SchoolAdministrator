import React, { Fragment, useEffect, useState } from 'react';
import { Popconfirm, message, Spin } from 'antd';
import CRUDTable from '../../components/CRUDTable';
import { Helmet } from 'react-helmet';
import { GetStudent, DeletePerson, AddPerson, UpdatePerson } from '../../services/personRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setStudent, deleteStudent, addStudent, updateStudent } from '../../redux/student/index';
import FormPerson from '../../components/FormPerson';

export const Student = () => {

  const columns = [
    {
      title: 'Identificacion',
      dataIndex: 'identificacion',
    },
    {
      title: 'Nombre Estudiante',
      dataIndex: 'nombreestudiante',
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
        studentState.length >= 1 ? ( <a onClick={() => 
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

            setStudentSelected({
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
    },
    {
      title: 'Eliminar',
      dataIndex: 'Eliminar',
      render: (text, record) =>
        studentState.length >= 1 ? (
          <Popconfirm title='¿Esta seguro de eliminar?' onConfirm={() => handleDelete(record.key)}>
            <a>Eliminar</a>
          </Popconfirm>
        ) : null,
    }
  ];

  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [studentState, setStudentState] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [studentSelected, setStudentSelected] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  const { student } = useSelector(
    state => ({
      student: state.student.student
    }),
    shallowEqual
  );

  const getData = async () => {
    setloading(true);
    let data = await GetStudent();
    switch (data.status) {
      case 200:
        data = data.data.payload.map(x => ({ ...x, key: x.id, nombreestudiante: `${x.nombre} ${x.apellido}` }));
        setStudentState(data);
        dispatch(setStudent(data));
        break;
      case 204:
        message.warning('No hay estudiantes disponibles');
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
        break;
    }
    setloading(false);
  }

  const handleDelete = async key => {
    setloading(true);
    let res = await DeletePerson(key);
    switch (res.status) {
      case 200:
        message.success('Estudiante eliminado con éxito');
        let data = studentState.filter(x => x.id !== key);
        setStudentState(data);
        dispatch(deleteStudent(key));
        break;
      case 202:
        message.warning(res.data.message);
        break;
      default:
        message.error('Ocurrio un error al eliminar el estudiante');
        break;
    }
    setloading(false);
  }

  const handleOkAdd = async e => {
    let entity = {
      'identificacion': parseInt(e.identificacion),
      'nombre': e.nombre,
      'apellido': e.apellido,
      'edad': parseInt(e.edad),
      'direccion': e.direccion,
      'telefono': parseInt(e.telefono),
      'rol': 1
    };

    let res = await AddPerson(entity);

    switch(res.status){
      case 200:
      case 201:
        res = { id: res.data.payload, ...entity, key: res.data.payload, nombreestudiante: `${entity.nombre} ${entity.apellido}`}
        setStudentState([...studentState, res]);
        dispatch(addStudent(res));
        message.success('Estudiante agregado con éxito');
        break;
      default:
          message.error('Ocurrio un error al agregar el estudiante');
    }
    setVisibleAdd(false);
  }

  const handleOkEdit = async e => {
    let entity = {
      'id': studentSelected.id,
      'identificacion': parseInt(e.identificacion),
      'nombre': e.nombre,
      'apellido': e.apellido,
      'edad': parseInt(e.edad),
      'direccion': e.direccion,
      'telefono': parseInt(e.telefono),
      'rol': 1
    };

    let res = await UpdatePerson(entity);

    switch(res.status){
      case 200:
      case 201:
        const data = studentState.map(x => (
          x.id === entity.id ? { ...entity, key: entity.id, nombreestudiante: `${entity.nombre} ${entity.apellido}` }
          : x
        ))
        setStudentState(data);
        dispatch(updateStudent(data));
        message.success('Estudiante editado con éxito');
        break;
      default:
          message.error('Ocurrio un error al editar el estudiante');
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
      <Helmet title='Estudiantes' />
      <h1>Estudiante</h1>
      <CRUDTable
        columns={columns}
        FormAdd={<FormPerson onFinish={handleOkAdd.bind(this)} />}
        FormEdit={<FormPerson onFinish={handleOkEdit.bind(this)} data={studentSelected} />}
        state={studentState}
        loading={loading}
        visibleAdd={visibleAdd}
        visibleEdit={visibleEdit}
        onVisibleAdd={onVisibleAdd.bind(this)}
        onVisibleEdit={onVisibleEdit.bind(this)}
      />
    </Fragment>
  )
}

export default Student;