/* eslint-disable no-unused-vars */
import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../../components/menus/Sidebar'; 

const { Content } = Layout;

const HomEmpleado = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar  />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomEmpleado;
