import React, { Fragment, useEffect, useState } from 'react';
import { Popconfirm, message, Spin } from 'antd';
import CRUDTable from '../../components/CRUDTable';
import { Helmet } from 'react-helmet';
import { GetStudent, DeletePerson, AddPerson } from '../../services/personRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setStudent, deleteStudent, addStudent } from '../../redux/student/index';
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
        studentState.length >= 1 ? (
          <Popconfirm title="¿Esta seguro de eliminar?" onConfirm={() => handleDelete(record.key)}>
            <a>Editar</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'Eliminar',
      dataIndex: 'Eliminar',
      render: (text, record) =>
        studentState.length >= 1 ? (
          <Popconfirm title="¿Esta seguro de eliminar?" onConfirm={() => handleDelete(record.key)}>
            <a>Eliminar</a>
          </Popconfirm>
        ) : null,
    }
  ];

  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [studentState, setStudentState] = useState([]);
  const [visible, setVisible] = useState(false);

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
        message.error(res.data.message);
        break;
      default:
        message.error('Ocurrio un error al eliminar el estudiante');
        break;
    }
    setloading(false);
  }

  const handleOk = async e => {
    let entity = {
      "identificacion": parseInt(e.identificacion),
      "nombre": e.nombre,
      "apellido": e.apellido,
      "edad": parseInt(e.edad),
      "direccion": e.direccion,
      "telefono": parseInt(e.telefono),
      "rol": 1
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
    setVisible(false);
  }

  const onVisible = status => setVisible(status);

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
        Form={<FormPerson onFinish={handleOk.bind(this)} />}
        state={studentState}
        loading={loading}
        visible={visible}
        onVisible={onVisible.bind(this)}
      />
    </Fragment>
  )
}

export default Student;