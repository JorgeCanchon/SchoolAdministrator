import React, { Fragment } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const FormSubject = ({ onFinish, teacher }) => {

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Fragment>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="codigo" label="Código:" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="nombre" label="Nombre:" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="idprofesor"
          label="Profesor:"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select placeholder="Seleccione...">
            {
              teacher.map(x => (
                <Option key={x.id} value={x.id}>
                  {`${x.identificacion} - ${x.nombreProfesor}`}
                </Option>
              ))
            }
          </Select>
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

export default FormSubject;