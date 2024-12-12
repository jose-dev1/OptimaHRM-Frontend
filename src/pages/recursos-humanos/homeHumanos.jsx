/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../../components/menus/Sidebar';
import Navbar from '../../components/menus/Navbar';
import Chat from '../../components/chat/chat';

const { Content } = Layout;

const HomeHumanos = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar onCollapseChange={handleSidebarCollapse} />
      <Layout style={{  }}>
        <Content
          style={{
            padding: 10,
            marginTop: 40,
            minHeight: 250,
            overflow: 'hidden',
          }}
        >
          <Navbar sidebarCollapsed={sidebarCollapsed} />
          <Chat />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeHumanos;
