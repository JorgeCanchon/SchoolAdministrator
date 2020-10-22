import React, { Fragment } from 'react';
import { Modal } from 'antd';

export const MyModal = ({ title, visible, handleOk, handleCancel, content }) => {
    return (
        <Fragment>
            <Modal
                title={title}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                >
                {content}
            </Modal>
        </Fragment>    
    );
}

export default MyModal;