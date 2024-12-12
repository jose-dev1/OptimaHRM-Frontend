import React, { useState } from 'react';
import { Layout, Input, Button, List, Typography, Card, Avatar, Space, Badge } from 'antd';
import { SearchOutlined, SendOutlined } from '@ant-design/icons';
import '../../styles/chat.css';
import { useUser } from '../../contexts/UserContext';

const { Sider, Content } = Layout;
const { Text, Title } = Typography;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([
    { name: 'Juan Pérez', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online' },
    { name: 'María González', avatar: 'https://i.pravatar.cc/150?img=2', status: 'offline' },
    { name: 'Carlos López', avatar: 'https://i.pravatar.cc/150?img=3', status: 'online' },
    { name: 'Ana Martínez', avatar: 'https://i.pravatar.cc/150?img=4', status: 'offline' },
    { name: 'Luis Hernández', avatar: 'https://i.pravatar.cc/150?img=5', status: 'online' },
    { name: 'Patricia Gómez', avatar: 'https://i.pravatar.cc/150?img=6', status: 'offline' },
  ]);
  
  const { user } = useUser(); 

  if (!user) {
    return null;
  }

  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: user.nombre, text: newMessage }]);
      setNewMessage('');
    }
  };

  const filteredUsers = connectedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout style={{ marginTop: '20px', minHeight: '82vh', background: '#f5f5f5' }}>
      <Sider
        width={290}
        theme="light"
        style={{
          borderRight: '1px solid #f0f0f0',
          padding: '20px',
          overflowY: 'auto',
          background: '#fff',
        }}
      >
        <Typography.Title level={5} style={{ marginBottom: '16px', fontWeight: '600' }}>
          Usuarios Conectados
        </Typography.Title>
        <Input
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ marginBottom: '20px', borderRadius: '20px', padding: '10px' }}
        />
        <List
          dataSource={filteredUsers}
          renderItem={(user) => (
            <List.Item
              onClick={() => setSelectedUser(user)}
              style={{ padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
            >
              <Space size="middle">
                <Badge status={user.status === 'online' ? 'success' : 'default'} />
                <Avatar src={user.avatar} />
                <Text>{user.name}</Text>
              </Space>
              <Text type="secondary" style={{ fontSize: '12px', marginLeft: 'auto' }}>
                {user.status === 'online' ? 'En línea' : 'Desconectado'}
              </Text>
            </List.Item>
          )}
        />
      </Sider>
      <Content style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
        {selectedUser ? (
          <Card
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                padding: '16px',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#f5f5f5',
              }}
            >
              <Avatar src={selectedUser.avatar} />
              <Title level={5} style={{ marginBottom: 0 }}>
                {selectedUser.name}
              </Title>
              <Badge status={selectedUser.status === 'online' ? 'success' : 'default'} />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {selectedUser.status === 'online' ? 'En línea' : 'Desconectado'}
              </Text>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                backgroundColor: '#ece5dd',  
                borderBottom: '1px solid #f0f0f0',
                height: '400px',
              }}
            >
              {messages.length === 0 && <Text type="secondary">No hay mensajes todavía</Text>}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: msg.user === user.name ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: msg.user === user.name ? '#18cb96' : '#fff',
                      color: msg.user === user.name ? '#fff' : '#000',
                      borderRadius: '10px',
                      padding: '8px 16px',
                      maxWidth: '60%',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Text strong>{msg.user}:</Text> <Text>{msg.text}</Text>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px',
                backgroundColor: '#fff',
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <Input
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onPressEnter={sendMessage}
                style={{
                  borderRadius: '20px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  flex: 1,
                }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={sendMessage}
                style={{
                  borderRadius: '50%',
                  padding: '12px',
                  backgroundColor: '#18cb96',
                  borderColor: '#18cb96',
                }}
              />
            </div>
          </Card>
        ) : (
          <Text type="secondary">Selecciona un usuario para comenzar la conversación</Text>
        )}
      </Content>
    </Layout>
  );
}
