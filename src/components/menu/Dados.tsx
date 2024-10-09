import React from 'react';
import { 
  EllipsisOutlined, 
  PlusSquareOutlined, 
  UnorderedListOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  DeleteOutlined, 
  UserOutlined, 
  ShoppingCartOutlined, 
  TeamOutlined, 
  AppstoreAddOutlined 
} from '@ant-design/icons';
import { Avatar, Card, Dropdown, Menu, Tooltip } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';

const IconText = ({ icon, text, tooltip, color, onClick }: { icon: React.ComponentType<any>; text: string; tooltip: string, color?: string, onClick?: () => void }) => (
  <Tooltip title={tooltip}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={onClick}>
      {React.createElement(icon, { style: { color: color || 'black', fontSize: '20px' } })}
      <span style={{ color: color || 'black', fontSize: '12px' }}>{text}</span>
    </div>
  </Tooltip>
);

const Dados: React.FC = () => {
  const navigate = useNavigate();

  // Função para navegar para a página de clientes ao clicar no "NOVO"
  const handleNovoCliente = () => {
    navigate('/cliente');
  };

  const actionsClientes = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Adicionar Novo" key="icon-new" color="#FF4C00" onClick={handleNovoCliente} />,
    <IconText icon={UnorderedListOutlined} text="175" tooltip="Lista com Todos" key="icon-all-itens" color="blue" />,
    <IconText icon={CheckCircleOutlined} text="123" tooltip="Apenas os Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="52" tooltip="Apenas os Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="15" tooltip="Apenas os Apagados" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">casamento</Menu.Item>
          <Menu.Item key="2">batizado</Menu.Item>
          <Menu.Item key="3">festa</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  const actions = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Adicionar Novo" key="icon-new" color="#FF4C00" />,
    <IconText icon={UnorderedListOutlined} text="175" tooltip="Lista com Todos" key="icon-all-itens" color="blue" />,
    <IconText icon={CheckCircleOutlined} text="123" tooltip="Apenas os Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="52" tooltip="Apenas os Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="15" tooltip="Apenas os Apagados" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">casamento</Menu.Item>
          <Menu.Item key="2">batizado</Menu.Item>
          <Menu.Item key="3">festa</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      <Card 
        actions={actionsClientes} 
        style={{ 
          flex: '1 1 calc(33.333% - 5px)', 
          minWidth: 290, 
          borderColor: 'black', 
          borderWidth: '2px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}
      >
        <Card.Meta
          avatar={
            <Tooltip title="Clientes">
              <Avatar icon={<UserOutlined style={{ color: 'black' }} />} />
            </Tooltip>
          }
          title="Clientes"
          description={
            <>
              <p>Os Clientes da sua Empresa</p>
            </>
          }
        />
      </Card>
      <Card 
        actions={actions} 
        style={{ 
          flex: '1 1 calc(33.333% - 5px)', 
          minWidth: 290, 
          borderColor: 'black', 
          borderWidth: '2px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}
      >
        <Card.Meta
          avatar={
            <Tooltip title="Fornecedores">
              <Avatar icon={<ShoppingCartOutlined style={{ color: 'black' }} />} />
            </Tooltip>
          }
          title="Fornecedores"
          description={
            <>
              <p>Os Fornecedores da sua Empresa</p>
            </>
          }
        />
      </Card>
      <Card 
        actions={actions} 
        style={{ 
          flex: '1 1 calc(33.333% - 5px)', 
          minWidth: 290, 
          borderColor: 'black', 
          borderWidth: '2px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}
      >
        <Card.Meta
          avatar={
            <Tooltip title="Parceiros">
              <Avatar icon={<TeamOutlined style={{ color: 'black' }} />} />
            </Tooltip>
          }
          title="Parceiros"
          description={
            <>
              <p>Os Parceiros da sua Empresa</p>
            </>
          }
        />
      </Card>
      <Card 
        actions={actions} 
        style={{ 
          flex: '1 1 calc(33.333% - 5px)', 
          minWidth: 290, 
          borderColor: 'black', 
          borderWidth: '2px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}
      >
        <Card.Meta
          avatar={
            <Tooltip title="Produtos">
              <Avatar icon={<AppstoreAddOutlined style={{ color: 'black' }} />} />
            </Tooltip>
          }
          title="Produtos"
          description={
            <>
              <p>Os Produtos da sua Empresa</p>
            </>
          }
        />
      </Card>
    </div>
  );
};

export default Dados;
