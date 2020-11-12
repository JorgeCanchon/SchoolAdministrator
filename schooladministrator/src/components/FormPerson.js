import React, { Fragment } from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const FormPerson = ({ onFinish, data }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const fields = data !== undefined ? [
    { 
      name: ['identificacion'], value: data.identificacion 
    },
    { 
      name: ['nombre'], value: data.nombre
    },
    { 
      name: ['apellido'], value: data.apellido
    }
    ,
    { 
      name: ['edad'], value: data.edad
    }
    ,
    { 
      name: ['direccion'], value: data.direccion
    }
    ,
    { 
      name: ['telefono'], value: data.telefono
    }
  ] : [];
 
  return (
    <Fragment>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}  fields={fields}>
        <Form.Item name="identificacion" label="Identificacion:" rules={[{ required: true}]} >
          <Input />
        </Form.Item>
        <Form.Item name="nombre" label="Nombre:" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="apellido" label="Apellidos:" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="edad" label="Edad:" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="direccion" label="Direccion:" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="telefono" label="Teléfono:" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ margin: '25px' }}>
            Enviar
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Limpiar
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default FormPerson;