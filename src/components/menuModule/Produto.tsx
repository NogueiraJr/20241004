import React from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface ProductType {
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

const columns: TableProps<ProductType>['columns'] = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    // Define a largura da coluna 'Nome' como desejado
    width: '100%', // ajuste conforme necessário
  },
  {
    title: 'Ações',
    key: 'action',
    width: '100px', // Largura fixa para a coluna de ações
    render: (_, record) => (
      <Space size="middle">
        <IconText icon={EditOutlined} text="EDITAR" tooltip="Editar o Item" key="icon-edit" color="black" />
        <IconText icon={DeleteOutlined} text="APAGAR" tooltip="Apagar o Item" key="icon-delete" color="black" />
      </Space>
    ),
  },
];

// Dados de exemplo
const data: ProductType[] = [
  {
    key: 'cm1z9ykkh000113tjm29ngrlt',
    name: 'Vestido de Festa',
    active: true,
    createAt: '2024-10-05T20:26:02.738Z',
    tags: null,
  },
  {
    key: 'cm1z9ykko000313tjw0ivjf1v',
    name: 'Terno',
    active: true,
    createAt: '2024-10-05T20:26:02.744Z',
    tags: ['casamento', 'festa'],
  },
  {
    key: 'cm1z9ykks000513tjz7sl12af',
    name: 'Vestido de Noiva',
    active: true,
    createAt: '2024-10-05T20:26:02.748Z',
    tags: null,
  },
  {
    key: 'cm1z9ykkw000713tja1g6vrtl',
    name: 'Smoking',
    active: true,
    createAt: '2024-10-05T20:26:02.752Z',
    tags: ['batizado', 'festa'],
  },
];

// Componente com exibição da data expandida
const Produto: React.FC = () => (
  <Table<ProductType>
    columns={columns}
    dataSource={data}
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
          <span>Criado em {formattedDate} | {record.active ? 'ATIVO' : 'INATIVO'} </span>
          {tagsDisplay && tagsDisplay.length > 0 && (
            <span style={{ marginLeft: '8px' }}>
              | {tagsDisplay}
            </span>
          )}
        </div>
      );
    }}
  />
);

export default Produto;
