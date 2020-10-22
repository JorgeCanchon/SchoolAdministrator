import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Table, Spin, message, Button } from 'antd';
import { GetSubjects, InsertSubject } from '../../services/subjectRequest';
import { GetTeacher } from '../../services/personRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addSubject, setSubjects } from '../../redux/subject/index';
import MyModal from '../../components/Modal';
import FormSubject from '../../components/FormSubject';

export const Subject = () => {

  const columns = [
    {
      title: 'Código Asignatura',
      dataIndex: 'codigo',
    },
    {
      title: 'Nombre Asignatura',
      dataIndex: 'nombre',
    },
    {
      title: 'Identificación',
      dataIndex: 'identificacion',
    },
    {
      title: 'Nombre Profesor',
      dataIndex: 'nombreProfesor',
    }
  ];

  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  
  const { subject } = useSelector(
    state => ({
      subject: state.subject.subject
    }),
    shallowEqual
  );

  const getData = async () => 
  {
    setloading(true);
    let data = await GetSubjects();
    switch(data.status)
    {
      case 200:
        data = data.data.payload.map(x =>({ 
          ...x, 
          id: x.codigo,
          nombreProfesor: `${x.persona.nombre} ${x.persona.apellido}`,
          identificacion: x.persona.identificacion
        }));

        dispatch(setSubjects(data));
        break;
      case 204:
        message.warning('No hay asignaturas disponibles');
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
        break;
    }
    setloading(false);
    getDataTeacher();
  }

  useEffect(() => {
    getData();
  }, []);
  
  const getDataTeacher = async () => 
  {
    setloading(true);
    let data = await GetTeacher();
    switch(data.status)
    {
      case 200:
        data = data.data.payload.map(x => ({ 
          id: x.id, 
          nombreProfesor: `${x.nombre} ${x.apellido}`,
          identificacion: x.identificacion
        }));
        setTeacher(data);
        break;
      case 204:
        message.warning('No hay profesores disponibles');
        break;
      default:
        message.error('Ocurrio un error al consultar los profesores');
        break;
    }
    setloading(false);
  }

  const handleOk = async e => {
    let entity = {
      id: e.codigo,
      codigo: e.codigo,
      idprofesor: parseInt(e.idprofesor),
      nombre: e.nombre
    };

    let dataTeacher = teacher.filter(x => x.id == entity.idprofesor)[0];

    let res = await InsertSubject({...entity, ...dataTeacher});

    switch(res.status){
      case 200:
      case 201:
         dispatch(addSubject({...entity, 
          identificacion: `${dataTeacher.identificacion}`, 
          nombreProfesor: `${dataTeacher.nombreProfesor }`}));
        message.success('Asignatura agregado con éxito');
        break;
      default:
          message.error('Ocurrio un error al agregar la asignatura');
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
      <Helmet title='Asignatura' />
      <h1>Asignaturas</h1>
      <Button onClick={() => onVisible(true)} type='primary' style={{ marginBottom: 16 }}>
        Agregar Asignatura
      </Button>
      <MyModal
        title='Agregar Asignatura'
        content={<FormSubject onFinish={handleOk.bind(this)} teacher={teacher} />}
        visible={visible}
        handleCancel={()  => onVisible(false)}
      />
      <Table columns={columns} dataSource={subject} rowKey="id" />
    </Fragment>
  )
}

export default Subject;