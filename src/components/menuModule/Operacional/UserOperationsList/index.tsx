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

const IconText = ({ icon, text, tooltip, color, onClick }: { icon: React.ComponentType<any>; text: string; tooltip: string, color?: string, onClick?: () => void }) => (
  <Tooltip title={tooltip}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={onClick}>
      {React.createElement(icon, { style: { color: color || 'black', fontSize: '20px' } })}
      <span style={{ color: color || 'black', fontSize: '12px' }}>{text}</span>
    </div>
  </Tooltip>
);

const Actions: React.FC<ActionsProps> = ({ action }) => {

  const { system } = useParameter();
  const navigate = useNavigate(); // Inicializando o hook de navegação

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [filterMoment, setFilterMoment] = React.useState<string | null>(null);

  console.log(system);
  console.log(action);

  const getActionDetails = (actions: string[], system: string, openModal: (moment: string) => void) => {
    const defaultActionMap: Record<string, { icon: React.ComponentType<any>; text: string; tooltip: string; color: string; action?: () => void }> = {
      reservar: { icon: CalendarOutlined, text: 'Reservas', tooltip: 'Exibe as Reservas', color: 'blue' },
      provar: { icon: SkinOutlined, text: 'Provas', tooltip: 'Exibe as Provas', color: 'green' },
      retirar: { icon: UploadOutlined, text: 'Retiradas', tooltip: 'Exibe as Retiradas', color: 'orange' },
      devolver: { icon: RollbackOutlined, text: 'Devoluções', tooltip: 'Exibe as Devoluções', color: 'red' },
      levar: {
        icon: ExportOutlined, 
        text: 'Levar', 
        tooltip: 'Levar no Cliente', 
        color: 'purple',
        action: () => openGoogleMaps() // Abre o Google Maps ao clicar
      },
      buscar: {
        icon: ImportOutlined, 
        text: 'Buscar', 
        tooltip: 'Buscar no Cliente', 
        color: 'blue', 
        action: () => openGoogleMaps() // Abre o Google Maps ao clicar
      },
      orcar: { icon: CalculatorOutlined, text: 'Orçamento', tooltip: 'Orçamento realizado', color: 'blue' },
      executar: { icon: FileDoneOutlined, text: 'Serviço', tooltip: 'Execução do Serviço', color: 'green' },
      checkin: {
        icon: LoginOutlined,
        text: 'Check-in',
        tooltip: 'Verificação de Entrada',
        color: 'blue',
        action: () => openModal('in'),
      },
      checkout: {
        icon: LogoutOutlined,
        text: 'Check-out',
        tooltip: 'Verificação de Saída',
        color: 'green',
        action: () => openModal('out'),
      },
      diagnostico: { icon: SearchOutlined, text: 'Diagnóstico', tooltip: 'Análise e avaliação', color: 'green' },
    };

    const openGoogleMaps = () => {
      // Defina as coordenadas de latitude e longitude ou o endereço
      const latitude = -23.1794; // Exemplo de latitude
      const longitude = -45.8869; // Exemplo de longitude
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
      // Abre o Google Maps
      window.open(url, '_blank');
    };
    
    const systemOverrides: Record<string, Partial<typeof defaultActionMap>> = {
      sysOficinaCarro: {
        executar: { icon: CarOutlined, text: 'Serviços', tooltip: 'Execução de Serviços Automotivos', color: 'green' },
      },
      sysLocacaoRoupa: {
        checkin: {
          icon: LoginOutlined,
          text: 'Check-in',
          tooltip: 'Verificação de Retorno do Cliente',
          color: 'blue',
          action: () => openModal('in'),
        },
        checkout: {
          icon: LogoutOutlined,
          text: 'Check-out',
          tooltip: 'Verificação de Entrega para o Cliente',
          color: 'purple',
          action: () => openModal('out'),
        },
      },
    };

    const actionMap = { ...defaultActionMap, ...systemOverrides[system] };

    return actions.map((action) => actionMap[action]).filter(Boolean); // Filtra ações inválidas
  };


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
                const actionDetails = getActionDetails(actions, system, openModalWithMoment);

                return actionDetails.map((details, index) => (
                  <IconText
                    key={index}
                    icon={details.icon}
                    text={details.text}
                    tooltip={details.tooltip}
                    color={details.color}
                    onClick={details.action} // Ação específica para cada item
                  />
                ));
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
