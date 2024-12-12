import  { useState } from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  MessageOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const { Sider } = Layout;
const { Title } = Typography;

// eslint-disable-next-line react/prop-types
const Sidebar = ({ onCollapseChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const getInitials = (email) => {
    const nameParts = email.split('@')[0].split('.');
    return nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '');
  };

  const getMenuItems = (role) => {
    switch (role) {
      case 5:
        return [
          { label: 'Dashboard', key: '/empleados', icon: <DashboardOutlined /> },
          { label: 'Users', key: '/empleados/users', icon: <UserOutlined /> },
          { label: 'Team', key: '/empleados/team', icon: <TeamOutlined /> },
        ];
      case 2:
        return [
          { label: 'Chat', key: '/recursos-humanos', icon: <MessageOutlined /> },
          { label: 'Empleados', key: '/recursos-humanos/empleados', icon: <TeamOutlined /> },
          { label: 'Certificados', key: '/recursos-humanos/certificados', icon: <FileTextOutlined /> },
          { label: 'Reportes', key: '/recursos-humanos/reportes', icon: <BarChartOutlined /> },
        
        ];
      default:
        return [];
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => {
        setCollapsed(collapsed);
        onCollapseChange(collapsed); 
      }}
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
        marginLeft: 0,
        borderRadius: '0 8px 8px 0',
      }}
    >
      <div
        style={{
          padding: '16px',
          textAlign: 'center',
          borderBottom: '1px solid #ddd', 
        }}
      >
        <Avatar
          style={{
            backgroundColor: '#18cb96',
            color: '#fff',
            fontSize: '24px',
            marginBottom: '16px',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            width: '60px',
            height: '60px',
          }}
        >
          {getInitials(user.correo)}
        </Avatar>
        <Title level={4} style={{ color: '#2C3E50', marginBottom: '8px' }}> 
          {user.nombre.split('@')[0]}
        </Title>
      </div>

      <Menu
        theme="light" 
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{
          backgroundColor: '#FFFFFF', 
          color: '#2C3E50', 
          fontSize: '16px',
        }}
        items={getMenuItems(user.id_rol).map((item) => ({
          ...item,
          style: {
            margin: '5px 0',
            borderRadius: '8px',
            backgroundColor:
              location.pathname === item.key ? '#18cb96' : 'transparent', 
            color: location.pathname === item.key ? '#fff' : '#2C3E50', 
            transition: 'all 0.3s ease',
          },
          onClick: () => navigate(item.key),
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
