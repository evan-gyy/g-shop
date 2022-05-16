import React, { useEffect, useState } from 'react';
import ProForm, {
  ProFormDigit,
  ProFormMoney,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { Modal, message, Cascader } from 'antd';
import { addUser } from '@/services/user';
import { getCategory } from '@/services/goods';

export default function Create(props) {
  const { isModalVisible, showModal, actionRef } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const resCategory = await getCategory();
      // console.log(resCategory);
      setOptions(resCategory);
    };
    getCat();
  });

  function onChange(value) {
    console.log(value);
  }

  function displayRender(label) {
    return label[label.length - 1];
  }

  /**
   * 添加商品
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
      title="添加商品"
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
        {/* 如果使用其他表单标签，需要套在ProForm.Item中，通过这个来设置标签和规则 */}
        <ProForm.Item
          name="catago_id"
          label="分类"
          rules={[{ required: true, message: '请输入分类' }]}
        >
          {/* 级联选择器 */}
          <Cascader
            fieldNames={{ label: 'name', value: 'id' }}
            options={options}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
            placeholder="请输入分类"
          />
        </ProForm.Item>

        {/* <ProFormText
          name="catago_id"
          label="分类"
          placeholder="请输入分类"
          rules={[{ required: true, message: '请输入分类' }]}
        /> */}
        <ProFormText
          name="title"
          label="商品名"
          placeholder="请输入商品名"
          rules={[{ required: true, message: '请输入商品名' }]}
        />
        <ProFormTextArea
          name="description"
          label="描述"
          placeholder="请输入描述"
          rules={[{ required: true, message: '请输入描述' }]}
        />
        <ProFormMoney
          name="price"
          label="价格"
          placeholder="请输入价格"
          rules={[{ required: true, message: '请输入价格' }]}
          locale="zh-CN"
          min={0}
          max={99999999}
        />
        <ProFormDigit
          name="stock"
          label="库存"
          placeholder="请输入库存"
          rules={[{ required: true, message: '请输入库存' }]}
          min={0}
          max={99999999}
        />
        <ProFormUploadButton label="上传商品图" name="cover" action="upload.do" />
        <ProFormTextArea
          name="details"
          label="详情"
          placeholder="请输入详情"
          rules={[{ required: true, message: '请输入详情' }]}
        />
      </ProForm>
    </Modal>
  );
}
