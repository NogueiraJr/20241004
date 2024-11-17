import React, { useState, useEffect, useMemo } from 'react';
import { Space, Table, Tag, Tooltip, Input, Select } from 'antd';
import type { TableProps } from 'antd';
import { CalculatorOutlined, CalendarOutlined, CarOutlined, CarryOutOutlined, CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, FileAddOutlined, FileDoneOutlined, ImportOutlined, InboxOutlined, ProfileOutlined, RollbackOutlined, ShoppingCartOutlined, ShoppingOutlined, SkinOutlined, SolutionOutlined, TagOutlined, ToolOutlined, UndoOutlined, UploadOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useParameter } from '../../../../context/ParameterContext';
import { userOperations } from '../../../fields/Operacional/userOperations-json';

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

interface ActionsProps {
  action: string;
}

const Actions: React.FC<ActionsProps> = ({ action }) => {
  
  const { system } = useParameter();

  console.log(system);
  console.log(action);

  const getActionDetails = (action: string) => {
    switch (action) {
      case 'reservar':
        return { icon: CalendarOutlined, text: 'Reservas', tooltip: 'Exibe as Reservas para Provar', color: 'blue' };
      case 'provar':
        return { icon: SkinOutlined, text: 'Provas', tooltip: 'Exibe as reservas provadas para retirar', color: 'green' };
      case 'retirar':
        return { icon: UploadOutlined, text: 'Retiradas', tooltip: 'Exibe as reservas retiradas para devolver', color: 'orange' };
      case 'devolver':
        return { icon: RollbackOutlined, text: 'Devolvidas', tooltip: 'Exibe as reservas devolvidas para manutenção', color: 'red' };
      case 'levar':
        return { icon: DeliveredProcedureOutlined, text: 'Levar', tooltip: 'Exibe as reservas à enviar ao Cliente', color: 'purple' };
      case 'buscar':
        return { icon: ImportOutlined, text: 'Buscar', tooltip: 'Exibe as reservas para buscar no Cliente', color: 'gold' };
      case 'orcar':
        return { icon: CalculatorOutlined, text: 'Orçamentos', tooltip: 'Exibe orçamentos realizados para serem executados', color: 'blue' };
      case 'executar':
        return { icon: FileDoneOutlined, text: 'Execuções', tooltip: 'Exibe serviços sendo executados', color: 'green' };
      default:
        return null;
    }
  };
        
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<OperationType[]>([]);

  const operations = useMemo(() => {
    return userOperations
          .filter((operation) => operation.systemId === system)
          .map((operation) => ({
            id: operation.id,
            description: operation.description,
            active: operation.active,
            notes: operation.notes,
            priceActions: operation.priceActions,
            priceCharged: operation.priceCharged,
            tags: operation.tags ? operation.tags.split('|') : [],
          }));
  }, [system, userOperations]);
  
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
  {action && ['sysLocacaoRoupa', 'sysOficinaCarro'].includes(system) && (() => {
    const actionDetails = getActionDetails(action);
    return actionDetails ? (
      <IconText
        icon={actionDetails.icon}
        text={actionDetails.text}
        tooltip={actionDetails.tooltip}
        color={actionDetails.color}
      />
    ) : null;
  })()}
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
