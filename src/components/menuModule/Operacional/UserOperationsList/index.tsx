import React, { useState, useEffect, useMemo } from 'react';
import { Space, Table, Tag, Tooltip, Input, Select, Button } from 'antd';
import type { TableProps } from 'antd';
import { CalculatorOutlined, CalendarOutlined, CarOutlined, CarryOutOutlined, CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, ArrowLeftOutlined, ExportOutlined, FileAddOutlined, FileDoneOutlined, ImportOutlined, InboxOutlined, LoginOutlined, LogoutOutlined, ProfileOutlined, RollbackOutlined, SearchOutlined, ShoppingCartOutlined, ShoppingOutlined, SkinOutlined, SolutionOutlined, TagOutlined, ToolOutlined, UndoOutlined, UploadOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useParameter } from '../../../../context/ParameterContext';
import { userOperations } from '../../../fields/Operacional/userOperations-json';
import MultiSelectList from '../UserActions/ActionsFlowPoints'; // Substitua pelo caminho correto
import { ActionsFlowPoints } from '../../../fields/Operacional/ActionsFlowPoints-json';
import { useNavigate } from 'react-router-dom'; // Importando o hook
import { OperationType } from '../../../../interfaces/OperationType';
import { ActionsProps } from '../../../../interfaces/ActionsProps';
import ActionDetails from './ActionDetails';
import IconText from './IconText';

const Actions: React.FC<ActionsProps> = ({ action }) => {

  const { system } = useParameter();
  const navigate = useNavigate(); // Inicializando o hook de navegação

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [filterMoment, setFilterMoment] = React.useState<string | null>(null);

  console.log(system);
  console.log(action);

  const openModalWithMoment = (moment: string) => {
    // Implementar a abertura do modal com o filtro 'moment'
    console.log(`Modal aberto com filtro: ${moment}`);
    setModalVisible(true); // Lógica para exibir o modal
    setFilterMoment(moment); // Lógica para aplicar o filtro
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
      <Button 
          type="primary" 
          onClick={() => navigate(-1)} // Função para voltar à página anterior
          icon={<ArrowLeftOutlined />} // Usando o ícone de "voltar"
          style={{ marginRight: 16 }}
        />
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
              {action && (() => {
                const actions = action.split('|'); // Supondo que as ações estejam separadas por '|'
                return <ActionDetails actions={actions} system={system} openModal={openModalWithMoment} />;
              })()}



              {isModalVisible && (
                <MultiSelectList
                  visible={isModalVisible}
                  onCancel={() => setModalVisible(false)}
                  data={{ ActionsFlowPoints }}
                  systemId={system}
                  moment={filterMoment}
                  title={filterMoment === 'in' ? 'Check-list de Entrada' : 'Check-list de Saída'} // Define o título dinamicamente
                />
              )}
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
