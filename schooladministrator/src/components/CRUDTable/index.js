import React, { Fragment } from 'react';
import { Table, Button, Spin } from 'antd';
import MyModal from '../Modal';

export const CRUDTable = ({ columns, FormAdd, FormEdit, state, 
  loading, visibleAdd, onVisibleAdd, visibleEdit, onVisibleEdit }) => {

  if (loading)
    return (
      <Fragment>
        <Spin />
      </Fragment>);
  return (
    <Fragment>
      <Button onClick={() => onVisibleAdd(true)} type='primary' style={{ marginBottom: 16 }}>
        Agregar
      </Button>
      <MyModal
        title='Agregar'
        content={FormAdd}
        visible={visibleAdd}
        handleCancel={()  => onVisibleAdd(false)}
      />
      <MyModal
        title='Editar'
        content={FormEdit}
        visible={visibleEdit}
        handleCancel={()  => onVisibleEdit(false)}
      />
      <Table columns={columns} dataSource={state} rowKey="id" /> 
    </Fragment>
  );
}

export default CRUDTable;