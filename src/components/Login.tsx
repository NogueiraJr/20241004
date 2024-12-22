import React, { useState } from 'react';
import { Button, Form, Input, Typography, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useParameter } from '../context/ParameterContext';
import '../index.css'; // Importa o arquivo de estilo
import logo from '../assets/images/logo.png';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const { setParameter } = useParameter(); // Obtém o método para definir o 'system'

  const handleLogin = (values: { username: string; password: string }) => {
    const { username, password } = values;

    setLoading(true);

    if (username.toLowerCase().trim() === 'oficina' && password === '123') {
      setParameter('sysOficinaCarro'); // Define 'system' no contexto
      navigate('/ini'); // Redireciona para a página inicial
    } else if (username.toLowerCase().trim() === 'locacao' && password === '123') {
      setParameter('sysLocacaoRoupa'); // Define 'system' no contexto
      navigate('/ini'); // Redireciona para a página inicial
    } else {
      message.error('Informe Usuário e Senha válidos.');
    }

    setLoading(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
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
        <Text
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '10px',
            cursor: 'pointer',
            color: '#1890ff',
          }}
          onClick={showModal}
        >
          Versão 1.2.0 - Última publicação: 22/12/2024
        </Text>
      </div>
      <Modal
        title="Histórico de Versões"
        visible={isModalVisible}
        onCancel={hideModal}
        footer={[
          <Button key="close" type="primary" onClick={hideModal}>
            Fechar
          </Button>,
        ]}
        bodyStyle={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        <ul>
          <li>
            <strong>Versão 1.2.0 - 22/12/2024</strong>
            <p>Descrição: Melhorias de desempenho e correção de bugs.</p>
            <ul>
              <li>Correção de problemas no login.</li>
              <li>Otimização do carregamento inicial.</li>
              <li>Atualização de dependências.</li>
            </ul>
          </li>
          <li>
            <strong>Versão 1.1.0 - 15/12/2024</strong>
            <p>Descrição: Novos recursos e melhorias.</p>
            <ul>
              <li>Adicionado suporte ao tema escuro.</li>
              <li>Melhoria na usabilidade do formulário.</li>
            </ul>
          </li>
          <li>
            <strong>Versão 1.0.0 - 01/12/2024</strong>
            <p>Descrição: Lançamento inicial do aplicativo.</p>
            <ul>
              <li>Funcionalidade básica de login.</li>
              <li>Configuração inicial do sistema.</li>
            </ul>
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default Login;
