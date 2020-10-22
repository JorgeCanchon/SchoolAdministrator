import React, { Fragment, useEffect, useState } from 'react';
import { Popconfirm, message } from 'antd';
import CRUDTable from '../../components/CRUDTable';
import { Helmet } from 'react-helmet';
import { GetTeacher, AddPerson } from '../../services/personRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addTeacher, setTeachers } from '../../redux/teacher/index';
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
        teacher.length >= 1 ? (
          <Popconfirm title="¿Esta seguro de eliminar?" onConfirm={() => console.log(record.key)}>
            <a>Editar</a>
          </Popconfirm>
        ) : null,
    }
  ];

  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [teacherState, setTeacherState] = useState([]);
  const [visible, setVisible] = useState(false);

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

  const handleOk = async e => {
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
    setVisible(false);
  }

  const onVisible = status => setVisible(status);

  return (
    <Fragment>
      <Helmet title='Profesor' />
      <h1>Profesor</h1>
      <CRUDTable
        columns={columns}
        Form={<FormPerson onFinish={handleOk.bind(this)} />}
        state={teacherState}
        loading={loading}
        visible={visible}
        onVisible={onVisible.bind(this)}
      />
    </Fragment>
  )
}

export default Teacher;