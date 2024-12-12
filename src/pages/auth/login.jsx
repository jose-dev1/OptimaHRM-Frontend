/* eslint-disable no-unused-vars */
import { Form, Input, Button, Checkbox, message, Spin, Row, Col } from 'antd';
import { LockOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Logo from '../../assets/img/Logo HRM.png';
import { useState } from 'react';
import { loginUser } from '../../services/auth/authService'; 
import { Link , useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      const data = await loginUser(values.correo, values.contraseña);
      setUserData(data.data);
      console.log(setUserData)

      const userRole = data.data.id_rol;  
      if (userRole === 5) {
        navigate('/empleados');
      } else if (userRole === 2) {
        navigate('/recursos-humanos');
      } else {
        message.error('Acceso no autorizado');
      }

      message.success('Inicio de sesión exitoso');
    } catch (error) {
      message.error('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(100deg, rgba(23, 202, 140, 0.0), rgba(55, 54, 67, 0.1))',
      }}
    >
      <div
        style={{
          width: '400px',
          padding: '30px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={Logo}
            alt="Logo HRM"
            style={{ width: '240px', height: 'auto' }}
          />
        </div>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={<span style={{ fontWeight: 'bold' }}>Correo Electrónico</span>}
            name="correo"
            rules={[
              { required: true, message: 'Por favor, ingresa tu correo' },
              { type: 'email', message: 'El correo no es válido' },
            ]}
            style={{ marginBottom: '16px' }}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="correo@ejemplo.com"
              style={{
                height: '45px',
                borderRadius: '8px',
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 'bold' }}>Contraseña</span>}
            name="contraseña"
            rules={[
              { required: true, message: 'Por favor, ingresa tu contraseña' },
              { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
            ]}
            style={{ marginBottom: '16px' }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              style={{
                height: '45px',
                borderRadius: '8px',
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Checkbox>Recordarme</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                height: '50px',
                fontSize: '16px',
                backgroundColor: '#373643',
                borderColor: '#373643',
                borderRadius: '8px',
                color: '#fff',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#18cb96';
                e.currentTarget.style.borderColor = '#18cb96';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#373643';
                e.currentTarget.style.borderColor = '#373643';
              }}
              disabled={loading}
            >
              {loading ? <Spin /> : 'Iniciar Sesión'}
            </Button>
          </Form.Item>
        </Form>

        <Row justify="center" align="middle" style={{ marginTop: '20px' }}>
          <Col>
            <Link href="/forgot-password" style={{ color: '#18cb96', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>¿Olvidaste tu contraseña?</span>
              <QuestionCircleOutlined style={{ fontSize: '18px' }} />
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
