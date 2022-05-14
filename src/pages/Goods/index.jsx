import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Switch, Avatar, message, Modal, Image } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import Create from './components/Create';
import Edit from './components/Edit';
import { getGoods } from '@/services/goods';

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
    const response = await getGoods(params);
    // console.log(response.data)
    return {
      data: response.data,
      success: true,
      total: response.data.length,
    };
  };

  const columns = [
    {
      title: '商品图',
      dataIndex: 'cover_url',
      hideInSearch: true,
      render: (_, record) => (
        <Image
          width={50}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      render: (_, record) => (
        <Switch
          checkedChildren="已上架"
          unCheckedChildren="未上架"
          defaultChecked={record.is_on === false}
          onChange={() => {
            message.success('操作成功');
          }}
        />
      ),
      valueType: 'radioButton',
      valueEnum: {
        true: { text: '已上架' },
        false: { text: '未上架' },
      },
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      render: (_, record) => (
        <Switch
          checkedChildren="已推荐"
          unCheckedChildren="未推荐"
          defaultChecked={record.is_recommend === false}
          onChange={() => {
            message.success('操作成功');
          }}
        />
      ),
      valueType: 'radioButton',
      valueEnum: {
        true: { text: '已推荐' },
        false: { text: '未推荐' },
      },
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
            新建
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
