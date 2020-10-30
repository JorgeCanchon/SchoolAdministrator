import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table, message, Spin } from 'antd';
import { GetReportGradebook } from '../../services/subjectRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setGradebooks } from '../../redux/gradebook/index';

export const GradeBook = () => {

  const columns = [
    {
      title: 'Año académico',
      dataIndex: 'añoAcademico',
    },
    {
      title: 'Identificación Alumno',
      dataIndex: 'identificacionAlumno',
    },
    {
      title: 'Nombre Alumno',
      dataIndex: 'nombreAlumno',
    },
    {
      title: 'Código Materia',
      dataIndex: 'codigo',
    },
    {
      title: 'Nombre Materia',
      dataIndex: 'nombre',
    },
    {
      title: 'Identificación Profesor',
      dataIndex: 'identificacionProfesor',
    },
    {
      title: 'Nombre del profesor',
      dataIndex: 'nombreProfesor',
    },
    {
      title: 'Calificación final',
      dataIndex: 'calificacion',
      width: '20%',
    },
    {
      title: 'Aprobó',
      dataIndex: 'aprobo',
    }
  ];
  
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  
  const { gradebook } = useSelector(
    state => ({
      gradebook: state.gradebook.gradebook
    }),
    shallowEqual
  );

  const getData = async () => 
  {
    setloading(true);
    let data = await GetReportGradebook();
    switch(data.status)
    {
      case 200:
        data = data.data.payload.map((x, i) =>({ ...x, key: i}));
        dispatch(setGradebooks(data));
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

  if (loading)
  return (
    <Fragment>
      <Spin />
    </Fragment>);
  return (
    <Fragment>
      <Helmet title='Calificaciones' />
      <h1>Calificaciones</h1>
      <Table columns={columns} dataSource={gradebook} rowKey="key" />
    </Fragment>
  )
}

export default GradeBook;