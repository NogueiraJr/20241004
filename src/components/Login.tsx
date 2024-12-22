import React, { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useParameter } from '../context/ParameterContext';
import '../index.css'; // Importa o arquivo de estilo
import logo from '../assets/images/logo.png';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setParameter } = useParameter(); // Obtém o método para definir o 'system'

  const handleLogin = (values: { username: string; password: string }) => {
    const { username, password } = values;

    setLoading(true);

    if (username.toLowerCase() === 'oficina' && password === '123') {
      setParameter('sysOficinaCarro'); // Define 'system' no contexto
      navigate('/ini'); // Redireciona para a página inicial
    } else if (username.toLowerCase() === 'locacao' && password === '123') {
      setParameter('sysLocacaoRoupa'); // Define 'system' no contexto
      navigate('/ini'); // Redireciona para a página inicial
    } else {
      message.error('Informe Usuário e Senha válidos.');
    }

    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
      <img 
        src={logo} 
        alt="OCST App" 
        style={{ borderRadius: '10px' }}
      />
      <div style={{ width: '300px', borderRadius: '10px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          OCST App
        </Title>
        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          initialValues={{ username: '', password: '' }}
        >
          <Form.Item
            label={<span className="custom-label">Usuário</span>}
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
          >
            <Input className="custom-field" placeholder="Usuário" />
          </Form.Item>

          <Form.Item
            label={<span className="custom-label">Senha</span>}
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password className="custom-field" placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="custom-button" loading={loading}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
