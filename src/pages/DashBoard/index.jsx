import React, { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { fetchDashboard } from '@/services/dashboard';

export default function Index() {
  let [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      let res = await fetchDashboard();
      console.log(res);
      setData(res);
    };
    getData();
  }, []);

  return (
    <div>
      <PageContainer>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Users"
                value={data.user}
                valueStyle={{ color: '#3f8600' }}
                suffix="位"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Goods"
                value={data.good}
                valueStyle={{ color: '#6666E2' }}
                suffix="种"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Orders"
                value={data.order}
                valueStyle={{ color: '#cf1322' }}
                suffix="个"
              />
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
}
