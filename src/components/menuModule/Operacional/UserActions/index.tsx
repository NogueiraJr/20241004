import React, { useState, useEffect, useMemo } from 'react';
import { Space, Table, Tag, Tooltip, Input, Select } from 'antd';
import type { TableProps } from 'antd';
import { CarryOutOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useParameter } from '../../../../context/ParameterContext';
import { userOperationsLocacaoRoupa } from '../../../fields/Operacional/sysLocacaoRoupa/userOperations-LocacaoRoupa-json';

interface OperationType {
  id: string;
  description: string;
  active: boolean;
  notes: string;
  priceActions: string;
  priceCharged: string;
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

const Actions: React.FC = () => {
  const { system } = useParameter();
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<OperationType[]>([]);

  const operations = useMemo(() => {
    return system === 'sysLocacaoRoupa' 
      ? userOperationsLocacaoRoupa.map((locacao) => ({
          id: locacao.id,
          description: locacao.description,
          active: locacao.active,
          notes: locacao.notes,
          priceActions: locacao.priceActions,
          priceCharged: locacao.priceCharged,
          tags: locacao.tags ? locacao.tags.split('|') : [],
        }))
      : [];
  }, [system]);

  useEffect(() => {
    const filtered = operations.filter((locacao) => {
      const matchesDescription = locacao.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter === 'all' || locacao.active === (statusFilter === 'active');
      const matchesTag = tagFilter === 'all' || (locacao.tags && locacao.tags.includes(tagFilter));
      return matchesDescription && matchesStatus && matchesTag;
    });
    setFilteredData(filtered);
  }, [searchText, statusFilter, tagFilter, operations]);

  const handleExpand = (expanded: boolean, record: OperationType) => {
    setExpandedRowKeys((prevExpandedRowKeys) => 
      expanded ? [...prevExpandedRowKeys, record.id] : prevExpandedRowKeys.filter((key) => key !== record.id)
    );
  };

  const columns: TableProps<OperationType>['columns'] = [
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      width: '100%',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Pesquisar por descrição"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 8, display: 'block' }}
          />
        </div>
      ),
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Ações',
      key: 'action',
      width: '100px',
      render: (_, record) => (
        <Space size="middle">
          <IconText icon={EditOutlined} text="Editar" tooltip="Editar estas informações" color="black" />
          {/* <IconText icon={CarryOutOutlined} text="Retirar" tooltip="Retirar os produtos" color="black" /> */}
        </Space>
      ),
    },
  ];
  
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder="Filtrar por status"
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 150, marginRight: 8 }}
          defaultValue="all"
        >
          <Select.Option value="all">Todos</Select.Option>
          <Select.Option value="active">Ativo</Select.Option>
          <Select.Option value="inactive">Inativo</Select.Option>
        </Select>

        <Select
          placeholder="Filtrar por tag"
          onChange={(value) => setTagFilter(value)}
          style={{ width: 150 }}
          defaultValue="all"
        >
          <Select.Option value="all">Todos</Select.Option>
          {Array.from(new Set(operations.flatMap(locacao => locacao.tags || []))).map(tag => (
            <Select.Option key={tag} value={tag}>
              {tag.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Table<OperationType>
  columns={columns}
  dataSource={filteredData}
  pagination={{ position: ['topLeft'] }}
  expandedRowRender={(record) => (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', color: 'gray' }}>
      <Tooltip title="Situação do item">
        <span style={{ cursor: 'pointer', marginLeft: '0px', marginRight: '8px', color: record.active ? 'green' : 'red' }}>
          {record.active ? 'ATIVO' : 'INATIVO'}
        </span>
      </Tooltip>
      {record.tags && record.tags.length > 0 && (
        <span style={{ cursor: 'pointer' }}>
          {record.tags.map((tag) => (
            <Tag color={tag.length > 5 ? 'geekblue' : 'green'} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </span>
      )}
      <span style={{ marginRight: '8px' }}>{record.notes}</span>
      <span style={{ marginRight: '8px', fontWeight: "bold" }}>
        Custo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceActions))}
      </span> |
      <span style={{ marginLeft: '8px', fontWeight: "bold" }}>
        Cobrado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceCharged))}
      </span>
  
      {/* Botões adicionais alinhados à direita */}
      <div style={{ display: 'flex', gap: '16px', marginLeft: 'auto', marginTop: '8px' }}>
        {/* <IconText icon={ShoppingOutlined} text="Produtos" tooltip="Visualizar produtos" color="blue" /> */}
        <IconText icon={CarryOutOutlined} text="Reservas" tooltip="Exibir as Reservas" color="orange" />
        <IconText icon={CloseCircleOutlined} text="Cancelar" tooltip="Cancelar as Reservas" color="red" />
      </div>
    </div>
  )}
  
  expandedRowKeys={expandedRowKeys}
  onExpand={handleExpand}
  rowKey="id"
  locale={{
    triggerDesc: 'Clique para ordenar decrescente',
    triggerAsc: 'Clique para ordenar crescente',
    cancelSort: 'Clique para cancelar a ordenação',
  }}
/>

    </>
  );
};

export default Actions;
