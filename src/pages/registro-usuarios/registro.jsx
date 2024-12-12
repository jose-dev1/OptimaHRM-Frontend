import React, { useState, useEffect } from 'react';
import { Steps, Button, Form, Input, Select, Card, Row, Col, Spin, Alert, message } from 'antd';
import { UserOutlined, ApartmentOutlined, ArrowRightOutlined, ArrowLeftOutlined, IdcardOutlined, ShopOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Step } = Steps;
const { Option } = Select;

const Registro = () => {
  const [current, setCurrent] = useState(0);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/empresa/listar');
        setEmpresas(data);
      } catch (error) {
        message.error('Error al cargar las empresas.');
      }
    };
    fetchEmpresas();
  }, []);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        id_tipo_usuario: tipoUsuario,
      };

      const endpoint = tipoUsuario === 1 ? '/api/registro/usuario' : '/api/registro/empresa';
      await axios.post(endpoint, payload);
      message.success('Registro completado con éxito');
    } catch (error) {
      message.error('Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  const tipoUsuarioSelection = (
    <Card title="Selecciona el tipo de usuario" style={{ textAlign: 'center' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Button
            type="default"
            block
            icon={<UserOutlined />}
            onClick={() => setTipoUsuario(1)}
            style={{ padding: '30px', fontSize: '18px' }}
          >
            Empleado
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="default"
            block
            icon={<ApartmentOutlined />}
            onClick={() => setTipoUsuario(2)}
            style={{ padding: '30px', fontSize: '18px' }}
          >
            Empresa
          </Button>
        </Col>
      </Row>
      {tipoUsuario && (
        <Button type="primary" onClick={next} style={{ marginTop: '20px' }}>
          Siguiente
        </Button>
      )}
    </Card>
  );

  const renderForm = () => (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        {tipoUsuario === 1 ? (
          <>
            <Col span={8}>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
              >
                <Input size="large" prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Correo"
                name="correo"
                rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}
              >
                <Input size="large" prefix={<IdcardOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Contraseña"
                name="contraseña"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Dirección"
                name="direccion"
                rules={[{ required: true, message: 'Por favor ingresa tu dirección' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tipo de Documento"
                name="id_tipo_documento"
                rules={[{ required: true, message: 'Por favor selecciona tu tipo de documento' }]}
              >
                <Select size="large">
                <Option value={1}>Cédula de Ciudadania</Option>
                <Option value={2}>Carnet de Extranjeria</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Número de Documento"
                name="num_documento"
                rules={[{ required: true, message: 'Por favor ingresa tu número de documento' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Empresa"
                name="id_empresa"
                rules={[{ required: true, message: 'Por favor selecciona tu empresa' }]}
              >
                <Select size="large">
                  {empresas.map((empresa) => (
                    <Option key={empresa.id_empresa} value={empresa.id_empresa}>
                      {empresa.nombre_empresa}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </>
        ) : (
          <>
            <Col span={8}>
              <Form.Item
                label="Nombre de la Empresa"
                name="nombre_empresa"
                rules={[{ required: true, message: 'Por favor ingresa el nombre de la empresa' }]}
              >
                <Input size="large" prefix={<ShopOutlined />} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="RUT"
                name="id_empresa"
                rules={[{ required: true, message: 'Por favor ingresa el RUT de la empresa' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Representante Legal"
                name="nombre_representante"
                rules={[{ required: true, message: 'Por favor ingresa el nombre del representante legal' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item
                label="Tipo de Documento"
                name="id_tipo_documento"
                rules={[{ required: true, message: 'Por favor selecciona tu tipo de documento' }]}
              >
                <Select size="large">
                  <Option value={1}>Cédula de Ciudadania</Option>
                  <Option value={2}>Carnet de Extranjeria</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item
                label="Número de Documento"
                name="numdoc_representante"
                rules={[{ required: true, message: 'Por favor ingresa tu número de documento' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Dirección"
                name="direccion"
                rules={[{ required: true, message: 'Por favor ingresa tu dirección' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Correo Electrónico"
                name="correo"
                rules={[{ required: true, message: 'Por favor ingresa el correo de la empresa' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Contraseña"
                name="contraseña"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item
                label="Sector Laboral"
                name="sector"
                rules={[{ required: true, message: 'Por favor selecciona tu sector laboral' }]}
              >
                <Select size="large">
                  <Option value={1}>Tecnologia</Option>
                  <Option value={2}>Slud</Option>
                  <Option value={3}>Manufactura</Option>
                  <Option value={4}>Textil</Option>
                </Select>
              </Form.Item>
            </Col>  
          </>
        )}
      </Row>
      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
        <Button type="default" onClick={prev} icon={<ArrowLeftOutlined />}>Anterior</Button>
        <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />}>Registrar</Button>
      </div>
    </Form>
  );

  return (
    <div style={{ maxWidth: 900, margin: 'auto', paddingTop: '50px' }}>
      <Steps current={current} onChange={setCurrent} size="small" style={{ marginBottom: 50 }}>
        <Step title="Seleccionar Tipo" icon={<UserOutlined />} />
        <Step title="Completar Datos" icon={<IdcardOutlined />} />
        <Step title="Confirmar" icon={<ShopOutlined />} />
      </Steps>
      {current === 0 && tipoUsuarioSelection}
      {current === 1 && renderForm()}
      {current === 2 && (
        <div style={{ textAlign: 'center' }}>
          {loading ? <Spin size="large" /> : <Alert message="¡Registro completado con éxito!" type="success" />}
        </div>

      )}
    </div>
  );
};

export default Registro;
