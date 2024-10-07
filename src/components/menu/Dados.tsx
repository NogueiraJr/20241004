import React from 'react';
import { 
  EllipsisOutlined, 
  PlusSquareOutlined, 
  UnorderedListOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  DeleteOutlined, 
  UserOutlined,   // Ícone para Clientes
  ShoppingCartOutlined, // Ícone para Fornecedores
  TeamOutlined, // Ícone para Parceiros
  AppstoreAddOutlined // Ícone para Produtos
} from '@ant-design/icons';
import { Avatar, Card, Dropdown, Menu, Tooltip } from 'antd';

const IconText = ({ icon, text, tooltip }: { icon: React.ComponentType<any>; text: string; tooltip: string }) => (
  <Tooltip title={tooltip}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {React.createElement(icon, { style: { color: 'black', fontSize: '20px' } })}
      <span style={{ color: 'black', fontSize: '12px' }}>{text}</span>
    </div>
  </Tooltip>
);

const actions = [
  <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Adicionar Novo Item" key="icon-new" />,
  <IconText icon={UnorderedListOutlined} text="175" tooltip="Lista com Todos os Itens" key="icon-all-itens" />,
  <IconText icon={CheckCircleOutlined} text="123" tooltip="Itens Ativos" key="icon-actived-itens" />,
  <IconText icon={CloseCircleOutlined} text="52" tooltip="Itens Inativos" key="icon-desatived-itens" />,
  <IconText icon={DeleteOutlined} text="15" tooltip="Itens Apagados" key="icon-deleted-itens" />,
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

const Dados: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
      <Card 
        actions={actions} 
        style={{ 
          flex: '1 1 calc(33.333% - 25px)', 
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
          } // Ícone para Clientes
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
          flex: '1 1 calc(33.333% - 25px)', 
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
          } // Ícone para Fornecedores
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
          flex: '1 1 calc(33.333% - 25px)', 
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
          } // Ícone para Parceiros
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
          flex: '1 1 calc(33.333% - 25px)', 
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
          } // Ícone para Produtos
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
