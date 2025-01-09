import { Space, Input, Tag, Popover } from 'antd';
import type { TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useMemo } from 'react';

import IconText from './IconText';
import OperationsTable from './UserOperationsTable';
import { UserOperationsProps } from '../../../../interfaces/UserOperationProps';
import { useParameter } from '../../../../context/ParameterContext';
import { OperationType } from '../../../../interfaces/UserOperationsType';
import { userOperations } from '../../../fields/Operacional/userOperations-json';

const Actions: React.FC<UserOperationsProps> = ({ userOperation: action }) => {

  const { system } = useParameter();

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [filterMoment, setFilterMoment] = React.useState<string | null>(null);

  // console.log(system);
  // console.log(action);

  const openModalWithMoment = (moment: string) => {
    // Implementar a abertura do modal com o filtro 'moment'
    // console.log(`Modal aberto com filtro: ${moment}`);
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

  const renderActionsPopover = (record: OperationType) => (
    <div>
      <IconText icon={EditOutlined} text="Editar" tooltip="Editar estas informações" color="black" />
      {/* <IconText icon={CarryOutOutlined} text="Retirar" tooltip="Retirar os produtos" color="black" /> */}
    </div>
  );

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
      render: (_, record) => (
        <div>
          <span>{record.description}</span>
          {record.tags && record.tags.length > 0 && (
            <div style={{ marginTop: 4 }}>
              {record.tags.map((tag) => (
                <Tag color={tag.length > 5 ? 'geekblue' : 'green'} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Ações',
      key: 'action',
      width: '100px',
      render: (_, record) => (
        <Popover content={renderActionsPopover(record)} title="Ações" trigger="click" placement="bottom">
          <Space size="middle">
            <IconText icon={UnorderedListOutlined} text="Ações" tooltip="Ações que podem ser feitas" color="black" />
          </Space>
        </Popover>
      ),
    },
  ];

  return (
    <OperationsTable
      operations={operations}
      filteredData={filteredData}
      columns={columns}
      setStatusFilter={setStatusFilter}
      setTagFilter={setTagFilter}
      setSearchText={setSearchText}
      expandedRowKeys={expandedRowKeys}
      handleExpand={handleExpand}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      filterMoment={filterMoment}
      openModalWithMoment={openModalWithMoment} navigate={useNavigate()} action={action} system={system}    />
  );

};

export default Actions;
