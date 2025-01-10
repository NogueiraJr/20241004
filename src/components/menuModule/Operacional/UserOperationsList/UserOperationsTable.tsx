import { Button, Select, Table, TableProps, Tooltip, Tabs, Popover, Steps } from "antd";
import { OperationType } from "../../../../interfaces/UserOperationsType";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ArrowLeftOutlined, CalendarOutlined, SkinOutlined, UploadOutlined, RollbackOutlined, CalculatorOutlined, FileDoneOutlined, SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import ActionDetails from "./UserOperationsDetails";
import MultiSelectList from "../UserActions/ActionsFlowPoints";
import { ActionsFlowPoints } from '../../../fields/Operacional/ActionsFlowPoints-json';
import { userActions } from '../../../fields/Operacional/userActions-json';
import '../../../../index.css';
import moment from "moment";

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

    const getStepStatus = (date: string | undefined) => date ? 'finish' : 'wait';
    const getStepIconColor = (date: string | undefined, color: string) => date ? color : 'gray';

    const renderTabs = (actions: string[], record: OperationType) => {
      return actions.map((action) => {
        const details = defaultActionMap[action];
        if (!details) return null;

        const filteredData = userActions.filter(
          (userAction) => userAction.userOperationId === record.id && userAction.actionId === details.actionId
        );

        const columnsForTab = [
          { title: "Descrição", dataIndex: "description", key: "description" },
          { 
            title: "Quando", 
            dataIndex: "scheduledAt", 
            key: "scheduledAt",
            render: (text: string, record: any) => {
              const lastDateColor = record.finishedAt
                ? 'green'
                : record.executedAt
                ? 'red'
                : record.scheduledAt
                ? 'blue'
                : 'gray';

              return (
                <Popover
                  content={
                    <Steps direction="vertical" size="small">
                      <Steps.Step 
                        title="Agendamento" 
                        description={moment(record.scheduledAt).format("DD/MM/YYYY HH:mm")} 
                        status={getStepStatus(record.scheduledAt)} 
                        icon={<CalendarOutlined style={{ color: getStepIconColor(record.scheduledAt, 'blue') }} />} 
                      />
                      {record.executedAt && (
                        <Steps.Step 
                          title="Execução" 
                          description={moment(record.executedAt).format("DD/MM/YYYY HH:mm")} 
                          status={getStepStatus(record.executedAt)} 
                          icon={<CalendarOutlined style={{ color: getStepIconColor(record.executedAt, 'red') }} />} 
                        />
                      )}
                      {record.finishedAt && (
                        <Steps.Step 
                          title="Finalização" 
                          description={moment(record.finishedAt).format("DD/MM/YYYY HH:mm")} 
                          status={getStepStatus(record.finishedAt)} 
                          icon={<CalendarOutlined style={{ color: getStepIconColor(record.finishedAt, 'green') }} />} 
                        />
                      )}
                    </Steps>
                  }
                  title="Quando"
                  trigger="click"
                  placement="bottom"
                >
                  <Tooltip title="Passos da Ação">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                      <CalendarOutlined style={{ color: lastDateColor }} />
                      <div style={{ color: lastDateColor }}>Quando</div>
                    </div>
                  </Tooltip>
                </Popover>
              );
            }
          },
          {
            title: "Ações",
            dataIndex: "action",
            key: "action",
            render: (text: string, record: any) => (
              <Popover
                content={
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <ActionDetails actions={[record.action]} system={system} userOperationId={record.key} openModal={openModalWithMoment} />
                  </div>
                }
                title="Ações2"
                trigger="click"
                placement="bottomRight"
              >
                <Tooltip title="Ações Disponíveis">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                    <UnorderedListOutlined style={{ color: 'blue' }} />
                    <div style={{ color: 'blue' }}>Ações1</div>
                  </div>
                </Tooltip>
              </Popover>
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

    const renderActionsPopover = (record: OperationType) => {
      const actions = action ? action.split('|') : [];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {actions.map((action) => {
            const details = defaultActionMap[action];
            return details ? (
              <Tooltip title={details.tooltip} key={details.text}>
                <Button
                  type="link"
                  icon={React.createElement(details.icon)}
                  onClick={() => openModalWithMoment(details.text)}
                  style={{ color: details.color }}
                >
                  {details.text}
                </Button>
              </Tooltip>
            ) : null;
          })}
        </div>
      );
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
            <div className="expanded-row-content">
              <div className="cost-charged">
                <span>
                  Custo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceActions))}
                </span>{' '}
                |
                <span>
                  Cobrado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceCharged))}
                </span>
              </div>

              <Tabs defaultActiveKey="1">
                {renderTabs(action ? action.split('|') : [], record)}
              </Tabs>

              <div className="action-buttons">
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