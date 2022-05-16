import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Switch, Avatar, message, Modal } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getUsers } from '@/services/user';
import Create from './components/Create';
import Edit from './components/Edit';

export default function Index() {
  const actionRef = useRef();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showModal = (show) => {
    setIsModalVisible(show);
    // console.log(show)
  };

  const showEditModal = (show) => {
    setIsEditModalVisible(show);
    // console.log(show)
  };

  const getData = async (params) => {
    const response = await getUsers(params);
    // console.log(response.data)
    return {
      data: response.data,
      success: true,
      total: response.data.length,
    };
  };

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => <Avatar icon={<UserOutlined />} />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          defaultChecked={record.is_locked === false}
          onChange={() => {
            message.success('操作成功');
          }}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      render: (_, record) => <a onClick={() => showEditModal(true)}>编辑</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params = {}) => getData(params)}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => showModal(true)}
          >
            添加用户
          </Button>,
        ]}
      />

      <Create isModalVisible={isModalVisible} showModal={showModal} actionRef={actionRef} />

      <Edit
        isEditModalVisible={isEditModalVisible}
        showEditModal={showEditModal}
        actionRef={actionRef}
      />
    </PageContainer>
  );
}
