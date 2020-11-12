import React, { Fragment, useState, useEffect } from 'react';
import { Form, Input, Button, Select, Spin, message } from 'antd';
import { GetStudent } from '../services/personRequest';
import { GetSubjects, InsertStudentSubject } from '../services/subjectRequest';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const FormStudentSubject = () => {

  const [form] = Form.useForm();
  const [subject, setSubject] = useState([]);
  const [student, setStudent] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() =>{
    getDataSubject();
  },[]);

  const onReset = () => {
    form.resetFields();
  };

  
  const getDataStudent = async () => {
    setloading(true);
    let data = await GetStudent();
    switch (data.status) {
      case 200:
        data = data.data.payload.map(x => ({ ...x, nombreestudiante: `${x.nombre} ${x.apellido}` }));
        setStudent(data);
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

  const getDataSubject = async () => 
  {
    setloading(true);
    let data = await GetSubjects();
    switch(data.status)
    {
      case 200:
        data = data.data.payload.map(x =>({ 
          id: x.codigo,
          codigo: x.codigo,
          idProfesor: x.persona.id,
          nombre: x.nombre
        }));

        setSubject(data);
        break;
      case 204:
        message.warning('No hay asignaturas disponibles');
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
        break;
    }
    setloading(false);
    getDataStudent();
  }

  const onFinish = async e => {
    setloading(true);
    
    if(isNaN(parseInt(e.calificacion)) || e.calificacion > 5 || e.calificacion < 0)
    {
      message.error('La calificacion debe ser mayor a 0 e inferior a 5');
      setloading(false);
      return;
    }

    if(isNaN(parseInt(e.anio))){
      message.error('Año no válido');
      setloading(false);
      return;
    }

    let codigos = e.codigo.split('-');
    let entity = {
      IdAlumno: parseInt(e.id),
      IdProfesor: parseInt(codigos[1]),
      Anio: parseInt(e.anio),
      CodigoAsignatura: codigos[0],
      Calificacion: parseFloat(e.calificacion)
    };

    let res = await InsertStudentSubject(entity);

    switch(res.status){
      case 200:
      case 201:
        message.success('Alumno asignado con éxito');
        break;
      case 202:
        message.warning(res.data.message);
        break;  
      default:
        message.error('Ocurrio un error al asignar la asignatura');
    }
    setloading(false);
  }

  if (loading)
    return (
      <Fragment>
        <Spin />
      </Fragment>);
  return (
    <div>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="codigo"
          label="Asignatura:"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select placeholder="Seleccione...">
            {
              subject.map(x => (
                <Option key={x.id} value={`${x.codigo}-${x.idProfesor}`}>
                  {`${x.codigo} - ${x.nombre}`}
                </Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="id"
          label="Alumno:"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select placeholder="Seleccione...">
            {
              student.map(x => (
                <Option key={x.id} value={x.id}>
                  {`${x.identificacion} - ${x.nombreestudiante}`}
                </Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item name="anio" label="Año:" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="calificacion" label="Calificacion:" rules={[{ required: true, min: 0 }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ margin: '25px' }}>
            Asignar
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Limpiar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormStudentSubject;