import { Button, Select, Table, TableProps, Tag, Tooltip } from "antd";
import { OperationType } from "../../../../interfaces/OperationType";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ActionDetails from "./UserOperationsDetails";
import MultiSelectList from "../UserActions/ActionsFlowPoints";
import { ActionsFlowPoints } from '../../../fields/Operacional/ActionsFlowPoints-json';

const ActionsTable: React.FC<{
    operations: OperationType[];
    filteredData: OperationType[];
    columns: TableProps<OperationType>['columns'];
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    setTagFilter: React.Dispatch<React.SetStateAction<string>>;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    navigate: ReturnType<typeof useNavigate>;
    expandedRowKeys: string[];
    handleExpand: (expanded: boolean, record: OperationType) => void;
    action: string | null;
    system: string;
    isModalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    filterMoment: string | null;
    openModalWithMoment: (moment: string) => void;
  }> = ({
    operations,
    filteredData,
    columns,
    setStatusFilter,
    setTagFilter,
    setSearchText,
    navigate,
    expandedRowKeys,
    handleExpand,
    action,
    system,
    isModalVisible,
    setModalVisible,
    filterMoment,
    openModalWithMoment,
  }) => (
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
          {Array.from(new Set(operations.flatMap((locacao) => locacao.tags || []))).map((tag) => (
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
            <span style={{ marginRight: '8px', fontWeight: 'bold' }}>
              Custo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceActions))}
            </span>{' '}
            |
            <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
              Cobrado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceCharged))}
            </span>

            {/* Botões adicionais alinhados à direita */}
            <div style={{ display: 'flex', gap: '16px', marginLeft: 'auto', marginTop: '8px' }}>
              {action &&
                (() => {
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

  export default ActionsTable;