import React from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface ClientType {
  key: string;
  name: string;
  active: boolean;
  createAt: string;
  tags: string[] | null;
}

const IconText = ({ icon, text, tooltip, color, onClick }: { icon: React.ComponentType<any>; text: string; tooltip: string, color?: string, onClick?: () => void }) => (
  <Tooltip title={tooltip}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={onClick}>
      {React.createElement(icon, { style: { color: color || 'black', fontSize: '20px' } })}
      <span style={{ color: color || 'black', fontSize: '12px' }}>{text}</span>
    </div>
  </Tooltip>
);

const columns: TableProps<ClientType>['columns'] = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    width: '100%', // ajuste conforme necessário
  },
  {
    title: 'Ações',
    key: 'action',
    width: '100px',
    render: (_, record) => (
      <Space size="middle">
        <IconText icon={EditOutlined} text="EDITAR" tooltip="Editar o Item" key="icon-edit" color="black" />
        <IconText icon={DeleteOutlined} text="APAGAR" tooltip="Apagar o Item" key="icon-delete" color="black" />
      </Space>
    ),
  },
];

// Dados de exemplo
const data: ClientType[] = [
  {
    key: 'cm1wfe41d0001p8795aihoxtu',
    name: 'Bruno Costa',
    active: true,
    createAt: '2024-10-05T20:26:02.738Z',
    tags: null,
  },
  {
    key: 'cm1wfe41k0003p8791famqx25',
    name: 'Daniel Santos',
    active: false,
    createAt: '2024-10-05T20:26:02.744Z',
    tags: ['casamento', 'festa'],
  },
  {
    key: 'cm1wfe41o0004p879vczh6fkt',
    name: 'Elisa Pereira',
    active: true,
    createAt: '2024-10-05T20:26:02.748Z',
    tags: null,
  },
  {
    key: 'cm1wfe41r0005p8796jfwz3dg',
    name: 'Felipe Almeida',
    active: false,
    createAt: '2024-10-05T20:26:02.752Z',
    tags: ['batizado', 'festa'],
  },
];

const Cliente: React.FC = () => (
  <Table<ClientType>
    columns={columns}
    dataSource={data}
    pagination={{ position: ['topRight'] }}
    expandedRowRender={(record) => {
      const formattedDate = new Date(record.createAt).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const tagsDisplay = record.tags && record.tags.length > 0 
        ? record.tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })
        : null;

      return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', color: 'gray' }}>
          <span style={{ marginRight: '8px' }}>Criado em {formattedDate}</span> | 
          <Tooltip title={'Situação do item'}>
            <span style={{ cursor: 'pointer', marginLeft: '8px', color: record.active ? 'green' : 'red' }}> {record.active ? 'ATIVO' : 'INATIVO'} </span>
          </Tooltip>
          {tagsDisplay && tagsDisplay.length > 0 && (
            <span style={{ cursor: 'pointer', marginLeft: '8px' }}>
              | {tagsDisplay}
            </span>
          )}
        </div>
      );
    }}
  />
);

export default Cliente;
