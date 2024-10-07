import React from 'react';
import { 
  EditOutlined, 
  EllipsisOutlined, 
  SettingOutlined, 
  StarOutlined, 
  LikeOutlined, 
  MessageOutlined, 
  UserOutlined,   // Ícone para Clientes
  ShoppingCartOutlined, // Ícone para Fornecedores
  TeamOutlined, // Ícone para Parceiros
  AppstoreAddOutlined // Ícone para Produtos
} from '@ant-design/icons';
import { Avatar, Card, Dropdown, Menu } from 'antd';

const IconText = ({ icon, text }: { icon: React.ComponentType<any>; text: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {React.createElement(icon, { style: { color: 'black', fontSize: '20px' } })}
    <span style={{ color: 'black', fontSize: '12px' }}>{text}</span>
  </div>
);

const actions = [
  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
  <EditOutlined key="edit" style={{ color: 'black' }} />,
  <SettingOutlined key="setting" style={{ color: 'black' }} />,
  <Dropdown
    overlay={
      <Menu>
        <Menu.Item key="1">Opção1</Menu.Item>
        <Menu.Item key="2">Opção2</Menu.Item>
      </Menu>
    }
    trigger={['click']}
  >
    <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
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
          avatar={<Avatar icon={<UserOutlined style={{ color: 'black' }} />} />} // Ícone para Clientes
          title="Clientes"
          description={
            <>
              <p>Seus Clientes no Sistema</p>
              <p>This is the description niobyboy y v vib biyv v ybuibiy vy vu vilubu b v v yvyuyiiluub utv lbureo gego vneubeprq beçuvb uerqg qeru</p>
              <p>This is the description</p>
              <p>This is the description</p>
              <p>This is the description</p>
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
          avatar={<Avatar icon={<ShoppingCartOutlined style={{ color: 'black' }} />} />} // Ícone para Fornecedores
          title="Fornecedores"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
              <p>This is the description</p>
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
          avatar={<Avatar icon={<TeamOutlined style={{ color: 'black' }} />} />} // Ícone para Parceiros
          title="Parceiros"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
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
          avatar={<Avatar icon={<AppstoreAddOutlined style={{ color: 'black' }} />} />} // Ícone para Produtos
          title="Produtos"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
    </div>
  );
};

export default Dados;
