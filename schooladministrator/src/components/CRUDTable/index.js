import React, { Fragment } from 'react';
import { Table, Button, Spin } from 'antd';
import MyModal from '../Modal';

export const CRUDTable = ({ columns, Form, state, loading, visible, onVisible }) => {

  if (loading)
    return (
      <Fragment>
        <Spin />
      </Fragment>);
  return (
    <Fragment>
      <Button onClick={() => onVisible(true)} type='primary' style={{ marginBottom: 16 }}>
        Agregar
      </Button>
      <MyModal
        title='Agregar'
        content={Form}
        visible={visible}
        handleCancel={()  => onVisible(false)}
      />
      <Table columns={columns} dataSource={state} rowKey="id" /> 
    </Fragment>
  );
}

export default CRUDTable;