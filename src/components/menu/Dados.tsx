import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined, StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, Card, Dropdown, Menu, Space } from 'antd';

const IconText = ({ icon, text }: { icon: React.ComponentType<any>; text: string }) => (
  <Space>
    {React.createElement(icon, { style: { color: 'black' } })}
    {text}
  </Space>
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
        <Menu.Item key="1">opção1</Menu.Item>
        <Menu.Item key="2">opção2</Menu.Item>
      </Menu>
    }
    trigger={['click']}
  >
    <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
  </Dropdown>,
];

const Dados: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      <Card actions={actions} style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 400, borderColor: 'black' }}>
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title="Clientes"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
      <Card actions={actions} style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 400, borderColor: 'black' }}>
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
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
