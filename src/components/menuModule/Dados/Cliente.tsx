import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip, Input, Select } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useParameter } from '../../../context/ParameterContext';
import { clientesLocacaoRoupa } from '../../fields/Dados/sysLocacaoRoupa/clientesLocacaoRoupa-json';
import { clientesOficinaCarro } from '../../fields/Dados/sysOficinaCarro/clientesOficinaCarro-json';

interface ClientType {
  id: string;
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

const Cliente: React.FC = () => {
  let clientes = [];
  const { system } = useParameter();

  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<ClientType[]>([]);

  const handleExpand = (expanded: boolean, record: ClientType) => {
    setExpandedRowKeys((prevExpandedRowKeys) => {
      return expanded ? [...prevExpandedRowKeys, record.id] : prevExpandedRowKeys.filter((key) => key !== record.id);
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleTagFilter = (value: string) => {
    setTagFilter(value);
  };

  // Ajustar os dados de clientes conforme o sistema
  switch (system) {
    case 'sysLocacaoRoupa':
      clientes = clientesLocacaoRoupa;
      break;
    case 'sysOficinaCarro':
      clientes = clientesOficinaCarro;
      break;
    default:
      break;
  }

  // Atualizar filteredData sempre que searchText, statusFilter, tagFilter ou clientes mudarem
  useEffect(() => {
    const filtered = clientes.filter((cliente) => {
      const matchesName = cliente.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter === 'all' || cliente.active === (statusFilter === 'active');
      const matchesTag = tagFilter === 'all' || (cliente.tags && cliente.tags.includes(tagFilter));

      // Apenas exibe os itens que correspondem a todos os filtros aplicados
      return matchesName && matchesStatus && matchesTag;
    });
    setFilteredData(filtered);
  }, [searchText, statusFilter, tagFilter, clientes]);

  const columns: TableProps<ClientType>['columns'] = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '100%',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Pesquisar por nome"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: 8, display: 'block' }}
          />
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'], 
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

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder="Filtrar por status"
          onChange={handleStatusFilter}
          style={{ width: 150, marginRight: 8 }}
          defaultValue="all"
        >
          <Select.Option value="all">Todos</Select.Option>
          <Select.Option value="active">Ativo</Select.Option>
          <Select.Option value="inactive">Inativo</Select.Option>
        </Select>

        <Select
          placeholder="Filtrar por tag"
          onChange={handleTagFilter}
          style={{ width: 150 }}
          defaultValue="all"
        >
          <Select.Option value="all">Todos</Select.Option>
          {Array.from(new Set(clientes.flatMap(cliente => cliente.tags || []))).map(tag => (
            <Select.Option key={tag} value={tag}>
              {tag.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Table<ClientType>
        columns={columns}
        dataSource={filteredData}
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
            ? record.tags.map((tag) => (
              <Tag color={tag.length > 5 ? 'geekblue' : 'green'} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            ))
            : null;

          return (
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', color: 'gray' }}>
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
          );
        }}
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

export default Cliente;
