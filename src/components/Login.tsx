import React, { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values: { username: string; password: string }) => {
    const { username, password } = values;

    setLoading(true);

    // Validação dos usuários
    if (username === 'oficina' && password === 'oficina') {
      navigate('/?system=sysOficinaCarro');
    } else if (username === 'locacaoroupa' && password === 'locacaoroupa') {
      navigate('/?system=sysLocacaoRoupa');
    } else {
      message.error('Informe Usuário e Senha válidos.');
    }

    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Login
        </Title>
        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          initialValues={{ username: '', password: '' }}
        >
          <Form.Item
            label="Usuário"
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
          >
            <Input placeholder="Usuário" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
