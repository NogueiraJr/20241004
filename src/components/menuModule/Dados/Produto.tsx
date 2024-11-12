import React, { useState } from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { produtosLocacaoRoupa } from '../../fields/produtosLocacaoRoupa-json';
import { useParameter } from '../../../context/ParameterContext';
import { produtosOficinaCarros } from '../../fields/produtosOficinaCarros-json';

export interface ProductType {
  id: string;
  name: string;
  description: string;
  productTypeId: string;
  price: number;
  active: boolean;
  createAt: string;
  updatedAt: string;
  deletedAt: string;
  userId: string;
  systemId: string;
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
    width: '100%',
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

const Produto: React.FC = () => {
  let produtos = [];
  const { system } = useParameter();

  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: ProductType) => {
    setExpandedRowKeys((prevExpandedRowKeys) => {
      if (expanded) {
        // Adiciona a chave do item expandido à lista
        return [...prevExpandedRowKeys, record.id];
      } else {
        // Remove a chave do item contraído da lista
        return prevExpandedRowKeys.filter((key) => key !== record.id);
      }
    });
  };

  switch (system) {
	case 'sysLocacaoRoupa':
		produtos = produtosLocacaoRoupa;	
		break;

	case 'sysOficinaCarros':
		produtos = produtosOficinaCarros;	
		break;
	  
	default:
		break;
  }

  return (
    <Table<ProductType>
      columns={columns}
      dataSource={produtos}
      pagination={{ position: ['topLeft'] }}
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
          <div style={{ color: 'gray' }}>
            <div>{record.description}</div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ marginRight: '8px' }}>Criado em {formattedDate}</span> |
              <Tooltip title={'Situação do item'}>
                <span style={{ cursor: 'pointer', marginLeft: '8px', color: record.active ? 'green' : 'red' }}>
                  {record.active ? 'ATIVO' : 'INATIVO'}
                </span>
              </Tooltip>
              {tagsDisplay && tagsDisplay.length > 0 && (
                <span style={{ cursor: 'pointer', marginLeft: '8px' }}>
                  | {tagsDisplay}
                </span>
              )}
            </div>
          </div>
        );
      }}
      expandedRowKeys={expandedRowKeys}
      onExpand={handleExpand}
      rowKey="id"
    />
  );
};

export default Produto;
