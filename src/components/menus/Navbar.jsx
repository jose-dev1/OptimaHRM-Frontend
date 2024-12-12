/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationOutlined, ClockCircleOutlined, FileTextOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Logo1 from '../../assets/img/Logo HRM.png';

export default function Navbar({ sidebarCollapsed }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div
      style={{
        ...styles.navbar,
        left: sidebarCollapsed ? '90px' : '205px', 
        transition: 'all 0.3s ease',
      }}
    >
      <div style={styles.leftSection}>
        <img src={Logo1} alt="OptimaHRM Logo" style={styles.logoImage} />
      </div>
      <div style={styles.rightSection}>
        <Tooltip title="Notificaciones">
          <Button icon={<NotificationOutlined />} style={styles.button} />
        </Tooltip>
        <Tooltip title="Marcación Horaria">
          <Button icon={<ClockCircleOutlined />} style={styles.button} />
        </Tooltip>
        <Tooltip title="Descarga de Certificados Laborales">
          <Button icon={<FileTextOutlined />} style={styles.button} />
        </Tooltip>
        <Tooltip title="Solicitud de Permisos">
          <Button icon={<UserAddOutlined />} style={styles.button} />
        </Tooltip>
        <Tooltip title="Cerrar Sesión">
          <Button icon={<LogoutOutlined />} style={styles.logoutButton} onClick={handleLogout} />
        </Tooltip>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    position: 'absolute',
    top: 0,
    right: 5,
    height: '60px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '8px',
    padding: '0 30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: '60px',
    left: 50,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#001529',
    border: 'none',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    borderRadius: '4px',
  },
  logoutButton: {
    backgroundColor: '#c11212',
    color: '#fff',
    border: 'none',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    borderRadius: '4px',
  },
};
