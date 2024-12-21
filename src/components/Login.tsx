import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values: { username: string; password: string }) => {
    setLoading(true);
    // Simulação de autenticação (substituir com lógica real)
    setTimeout(() => {
      if (values.username === 'admin' && values.password === '123456') {
        navigate('/ini'); // Redireciona para a página inicial após o login
      } else {
        alert('Usuário ou senha inválidos!');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Form
        name="login"
        layout="vertical"
        style={{ width: 300, padding: 20, borderRadius: 10, background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        onFinish={handleLogin}
      >
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form.Item
          name="username"
          label="Usuário"
          rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
        >
          <Input placeholder="Digite seu usuário" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Senha"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Digite sua senha" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
