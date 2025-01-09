import { Button, Select, Table, TableProps, Tooltip, Tabs } from "antd";
import { OperationType } from "../../../../interfaces/UserOperationsType";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ArrowLeftOutlined, CalendarOutlined, SkinOutlined, UploadOutlined, RollbackOutlined, CalculatorOutlined, FileDoneOutlined, SearchOutlined } from "@ant-design/icons";
import ActionDetails from "./UserOperationsDetails";
import MultiSelectList from "../UserActions/ActionsFlowPoints";
import { ActionsFlowPoints } from '../../../fields/Operacional/ActionsFlowPoints-json';
import { userActions } from '../../../fields/Operacional/userActions-json';

const OperationsTable: React.FC<{
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
  }) => {
    const defaultActionMap: Record<
      string,
      {
        icon: React.ComponentType<any>;
        text: string;
        tooltip: string;
        color: string;
        actionId: string;
      }
    > = {
      reservar: {
        icon: CalendarOutlined,
        text: "Reservas",
        tooltip: "Exibe as Reservas",
        color: "blue",
        actionId: "sysLocacaoRoupa_reservar",
      },
      provar: {
        icon: SkinOutlined,
        text: "Provas",
        tooltip: "Exibe as Provas",
        color: "green",
        actionId: "sysLocacaoRoupa_provar",
      },
      retirar: {
        icon: UploadOutlined,
        text: "Retiradas",
        tooltip: "Exibe as Retiradas",
        color: "orange",
        actionId: "sysLocacaoRoupa_retirar",
      },
      devolver: {
        icon: RollbackOutlined,
        text: "Devoluções",
        tooltip: "Exibe as Devoluções",
        color: "red",
        actionId: "sysLocacaoRoupa_devolver",
      },
      orcar: {
        icon: CalculatorOutlined,
        text: "Orçamento",
        tooltip: "Orçamento realizado",
        color: "blue",
        actionId: "sysOficinaCarro_orcar",
      },
      executar: {
        icon: FileDoneOutlined,
        text: "Atendimentos",
        tooltip: "Execução do Serviço",
        color: "green",
        actionId: "sysOficinaCarro_executar",
      },
      diagnostico: {
        icon: SearchOutlined,
        text: "Diagnósticos",
        tooltip: "Análise e avaliação",
        color: "green",
        actionId: "sysOficinaCarro_diagnosticar",
      },
    };

    const renderTabs = (actions: string[], record: OperationType) => {
      return actions.map((action) => {
        const details = defaultActionMap[action];
        if (!details) return null;

        const filteredData = userActions.filter(
          (userAction) => userAction.userOperationId === record.id && userAction.actionId === details.actionId
        );

        const columnsForTab = [
          { title: "Descrição", dataIndex: "description", key: "description" },
          { title: "Quando", dataIndex: "scheduledAt", key: "scheduledAt" },
          {
            title: "Ações",
            dataIndex: "action",
            key: "action",
            render: (text: string, record: any) => (
              <ActionDetails actions={[record.action]} system={system} userOperationId={record.key} openModal={openModalWithMoment} />
            ),
          },
        ];

        return (
          <Tabs.TabPane tab={<span>{details.text}</span>} key={details.text}>
            <Table dataSource={filteredData} columns={columnsForTab} pagination={false} />
          </Tabs.TabPane>
        );
      });
    };

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
            <div style={{ display: 'flex', flexDirection: 'column', color: 'gray', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ marginRight: '8px', fontWeight: 'bold' }}>
                  Custo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceActions))}
                </span>{' '}
                |
                <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                  Cobrado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceCharged))}
                </span>
              </div>

              <Tabs defaultActiveKey="1" style={{ marginTop: 8, width: '100%', height: '200px' }}>
                {renderTabs(action ? action.split('|') : [], record)}
              </Tabs>

              {/* Botões adicionais alinhados à direita */}
              <div style={{ display: 'flex', gap: '16px', marginLeft: 'auto', marginTop: '8px' }}>
                {action &&
                  (() => {
                    const actions = action.split('|'); // Supondo que as ações estejam separadas por '|'
                    return <ActionDetails actions={actions} system={system} userOperationId={record.id} openModal={openModalWithMoment} />;
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

  export default OperationsTable;