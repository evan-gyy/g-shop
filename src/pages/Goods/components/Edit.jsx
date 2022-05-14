import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message } from 'antd';
import { addUser } from '@/services/user';

export default function Edit(props) {
  const { isEditModalVisible, showEditModal, actionRef } = props;

  /**
   * 编辑用户
   */
  const editUser = async (values) => {
    console.log(values);
    const response = await addUser(values);
    console.log(response);
    if (response.status === true) {
      message.success('编辑成功');
      actionRef.current.reload();
      showEditModal(false);
    }
  };

  return (
    <Modal
      title="编辑用户"
      visible={isEditModalVisible}
      onOk={() => showEditModal(false)}
      onCancel={() => showEditModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      <ProForm
        onFinish={async (values) => {
          editUser(values);
        }}
      >
        <ProFormText
          name="name"
          label="昵称"
          placeholder="请输入昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        />
        <ProFormText
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        />
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="请输入密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码最小为6位' },
          ]}
        />
      </ProForm>
    </Modal>
  );
}
