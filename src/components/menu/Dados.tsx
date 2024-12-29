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

  const handleListaTodosClientes = () => {
    navigate('/cliente');
  };

  const handleListaTodosProdutos = () => {
    navigate('/produto');
  };

  const handleListaTodosFornecedores = () => {
    navigate('/fornecedor');
  };

  const handleListaTodosParceiros = () => {
    navigate('/parceiro');
  };

  const actionsClientes = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Adicionar Novo" key="icon-new" color="black" />,
    <IconText icon={UnorderedListOutlined} text="30" tooltip="Lista com Todos" key="icon-all-itens" color="blue" onClick={handleListaTodosClientes}/>,
    <IconText icon={CheckCircleOutlined} text="2" tooltip="Apenas os Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="2" tooltip="Apenas os Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas os Apagados" key="icon-deleted-itens" color="red" />,
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

  const actionsProdutos = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Adicionar Novo" key="icon-new" color="black" />,
    <IconText icon={UnorderedListOutlined} text="12" tooltip="Lista com Todos" key="icon-all-itens" color="blue" onClick={handleListaTodosProdutos}/>,
    <IconText icon={CheckCircleOutlined} text="7" tooltip="Apenas os Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="4" tooltip="Apenas os Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas os Apagados" key="icon-deleted-itens" color="red" />,
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

  const actionsFornecedores = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Adicionar Novo" key="icon-new" color="black" />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Lista com Todos" key="icon-all-itens" color="blue" onClick={handleListaTodosFornecedores}/>,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas os Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas os Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas os Apagados" key="icon-deleted-itens" color="red" />,
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

  const actionsParceiros = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Adicionar Novo" key="icon-new" color="black" />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Lista com Todos" key="icon-all-itens" color="blue" onClick={handleListaTodosParceiros}/>,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas os Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas os Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas os Apagados" key="icon-deleted-itens" color="red" />,
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
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Lista com Todos" key="icon-all-itens" color="blue" />,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas os Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas os Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas os Apagados" key="icon-deleted-itens" color="red" />,
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
        className="card-style"
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
        actions={actionsProdutos} 
        className="card-style"
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
      <Card 
        actions={actionsFornecedores} 
        className="card-style"
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
        actions={actionsParceiros} 
        className="card-style"
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
    </div>
  );
};

export default Dados;
