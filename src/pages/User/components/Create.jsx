import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message } from 'antd';
import { addUser } from '@/services/user';

export default function Create(props) {
  const { isModalVisible, showModal, actionRef } = props;

  /**
   * 添加用户
   */
  const createUser = async (values) => {
    console.log(values);
    const response = await addUser(values);
    console.log(response);
    if (response.status === true) {
      message.success('添加成功');
      actionRef.current.reload();
      showModal(false);
    }
  };

  return (
    <Modal
      title="添加用户"
      visible={isModalVisible}
      onOk={() => showModal(false)}
      onCancel={() => showModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      <ProForm
        onFinish={async (values) => {
          createUser(values);
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
