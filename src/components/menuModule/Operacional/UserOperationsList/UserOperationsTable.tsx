import { Button, Select, Table, TableProps, Tooltip, Tabs, Popover, Steps, Modal, Tag, Collapse, List } from "antd";
import { OperationType } from "../../../../interfaces/UserOperationsType";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ArrowLeftOutlined, CalendarOutlined, SkinOutlined, UploadOutlined, RollbackOutlined, CalculatorOutlined, FileDoneOutlined, SearchOutlined, UnorderedListOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { userActions } from '../../../fields/Operacional/userActions-json';
import '../../../../index.css';
import moment from "moment";
import { userActionsItems } from "../../../fields/Operacional/userActionsItems-json";
import FilterTop from "./components/FilterTop";
import ModalItens from "./components/ModalItens";
import DefaultActionMap from "./functions/defaultActionMap";

const { Panel } = Collapse;

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
    const closeModal = () => {
      setModalOpen(false);
      setModalData([]);
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalData, setModalData] = useState<any[]>([]);
    const getColorForTag = (tag: string) => {
      const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
      const index = tag.length % colors.length;
      return colors[index];
    };
    const defaultActionMap: Record<
      string,
      {
        icon: React.ComponentType<any>;
        text: string;
        tooltip: string;
        color: string;
        actionId: string;
      }
    > = DefaultActionMap();

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
          {
            title: "Descrição",
            dataIndex: "description",
            key: "description",
            width: '100%',
            render: (text: string, record: any) => (
              <>
                <Tooltip title={record.notes}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                    <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.description}</span>
                    <div>
                      {record.tags?.split('|').map((tag: string, index: number) => (
                        <Tag color={getColorForTag(tag)} key={index}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </Tooltip>
              </>
            )
          },
          {
            title: "Quando",
            dataIndex: "scheduledAt",
            key: "scheduledAt",
            width: 120,
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
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', cursor: 'pointer' }}>
                      <CalendarOutlined style={{ color: lastDateColor }} />
                      <div style={{ color: lastDateColor }}>{record.finishedAt ? moment(record.finishedAt).format("DD/MM/YYYY HH:mm") : record.executedAt ? moment(record.executedAt).format("DD/MM/YYYY HH:mm") : moment(record.scheduledAt).format("DD/MM/YYYY HH:mm")}</div>                    </div>
                  </Tooltip>
                </Popover>
              );
            }
          },
          {
            title: "Ações",
            dataIndex: "action",
            key: "action",
            width: 80,
            render: (text: string, record: any) => (
              <Popover
                content={getNextActionIcon(record.actionId, record.executedAt, record.finishedAt, record.id)}
                title="Ações"
                trigger="click"
                placement="bottomRight"
              >
                <Tooltip title="Ações Disponíveis">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                    <UnorderedListOutlined style={{ color: 'blue' }} />
                    <div style={{ color: 'blue' }}>Ações</div>
                  </div>
                </Tooltip>
              </Popover>
            ),
          },
        ];
        const showConfirm = (action: string) => {
          Modal.confirm({
            title: `Você deseja ${action}?`,
            content: `Confirme se deseja ${action.toLowerCase()}.`,
            onOk() {
              console.log(`Confirmado: ${action}`);
            },
            onCancel() {
              console.log(`Cancelado: ${action}`);
            },
          });
        };

        const handleActionClick = (action: string, actionId: string, userActionId?: string) => {
          console.log(`Action: ${action} - ActionId: ${actionId} - UserOperationId: ${record.id}`);
          setModalTitle(action === "Itens" ? "Itens" : action.charAt(0).toUpperCase() + action.slice(1));

          if (action === "Itens") {
            const userAction = userActions.find(action => action.actionId === actionId && action.userOperationId === record.id && action.id === userActionId);
            const products = userActionsItems.filter(item => item.userActionId === userAction?.id);

            console.log("UserActionsItems:", userActionsItems);
            console.log("userOperationId:", record.id);
            console.log("Products:", products);

            const groupedData = products.reduce((acc: any, product: any) => {
              const { productTypeId, name, description, quantity, price, tags } = product;
              if (!acc[productTypeId]) {
                acc[productTypeId] = [];
              }
              acc[productTypeId].push({ key: product.id, name, description, quantity, price, tags: tags || [] });
              return acc;
            }, {});

            const formattedData = Object.keys(groupedData).map((productTypeId) => ({
              key: productTypeId,
              productTypeId,
              products: groupedData[productTypeId],
            }));

            setModalData(formattedData);
          } else {
            const filteredData = userActions.filter(
              (userAction) => userAction.userOperationId === record.id && userAction.actionId.toLocaleLowerCase().trim() === actionId.toLocaleLowerCase().trim()
            ).map((userAction) => {
              const getStepStatus = (date: string | undefined) => date ? 'finish' : 'wait';
              const getStepIconColor = (date: string | undefined, color: string) => date ? color : 'gray';

              const lastDateColor = userAction.finishedAt
                ? 'green'
                : userAction.executedAt
                  ? 'red'
                  : userAction.scheduledAt
                    ? 'blue'
                    : 'gray';

              return {
                key: userAction.id,
                description: userAction.description,
                tags: userAction.tags,
                notes: userAction.notes,
                scheduledAt: (
                  <Popover
                    content={
                      <Steps direction="vertical" size="small">
                        <Steps.Step
                          title="Agendamento"
                          description={moment(userAction.scheduledAt).format("DD/MM/YYYY HH:mm")}
                          status={getStepStatus(userAction.scheduledAt)}
                          icon={<CalendarOutlined style={{ color: getStepIconColor(userAction.scheduledAt, 'blue') }} />}
                        />
                        {userAction.executedAt && (
                          <Steps.Step
                            title="Execução"
                            description={moment(userAction.executedAt).format("DD/MM/YYYY HH:mm")}
                            status={getStepStatus(userAction.executedAt)}
                            icon={<CalendarOutlined style={{ color: getStepIconColor(userAction.executedAt, 'red') }} />}
                          />
                        )}
                        {userAction.finishedAt && (
                          <Steps.Step
                            title="Finalização"
                            description={moment(userAction.finishedAt).format("DD/MM/YYYY HH:mm")}
                            status={getStepStatus(userAction.finishedAt)}
                            icon={<CalendarOutlined style={{ color: getStepIconColor(userAction.finishedAt, 'green') }} />}
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
                ),
                action: userAction.actionId,
                executedAt: userAction.executedAt,
                finishedAt: userAction.finishedAt,
              };
            });
            setModalData(filteredData);
          }
          setModalOpen(true);
        };

        const getNextActionIcon = (actionId: string, executedAt: string | null, finishedAt: string | null, userActionId?: string) => {
          const isExecuted = !!executedAt;
          const isFinished = !!finishedAt;

          switch (actionId) {
            case "sysLocacaoRoupa_reservar":
              return actionMenuExecute([
                { icon: SkinOutlined, color: 'green', text: 'Provar', action: () => showConfirm("Provar") },
                { icon: UploadOutlined, color: 'orange', text: 'Retirar', action: () => showConfirm("Retirar") },
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysLocacaoRoupa_provar":
              return actionMenuExecute([
                { icon: UploadOutlined, color: 'orange', text: 'Retirar', action: () => showConfirm("Retirar") },
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysLocacaoRoupa_retirar":
              return actionMenuExecute([
                { icon: RollbackOutlined, color: 'red', text: 'Devolver', action: () => showConfirm("Devolver") },
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysLocacaoRoupa_devolver":
              return actionMenuExecute([
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysOficinaCarro_diagnosticar":
              return actionMenuExecute([
                { icon: CalculatorOutlined, color: 'blue', text: 'Orçar', action: () => showConfirm("Orçar") },
                { icon: FileDoneOutlined, color: 'green', text: 'Executar', action: () => showConfirm("Executar"), disabled: isExecuted },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysOficinaCarro_orcar":
              return actionMenuExecute([
                { icon: FileDoneOutlined, color: 'green', text: 'Executar', action: () => showConfirm("Executar"), disabled: isExecuted },
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysOficinaCarro_executar":
              return actionMenuExecute([
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            default:
              return null;
          };
        };

        const actionMenuExecute = (actions: { icon: React.ComponentType<any>; color: string; text: string; action: () => void; disabled?: boolean }[]) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              {actions.map((action, index) => (
                <React.Fragment key={index}>
                  {action.text === 'Itens' && <div style={{ borderLeft: '1px solid #ccc', height: '24px', margin: '0 10px' }} />}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: action.disabled ? 'not-allowed' : 'pointer' }} onClick={!action.disabled ? action.action : undefined}>
                    {React.createElement(action.icon, { style: { color: action.disabled ? 'gray' : action.color } })}
                    <div style={{ color: action.disabled ? 'gray' : action.color }}>{action.text}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          );
        }; return (
          <Tabs.TabPane tab={<span>{details.text}</span>} key={details.text}>
            <Table showHeader={false} dataSource={filteredData} columns={columnsForTab} pagination={false} />
          </Tabs.TabPane>
        );
      });
    };

    return (
      <>
        {FilterTop({ navigate, setStatusFilter, setTagFilter, operations })}

        <Table<OperationType>
          columns={columns}
          dataSource={filteredData}
          pagination={{ position: ['topLeft'] }}
          expandedRowRender={(record) => (
            <div className="expanded-row-content">
              <div className="cost-charged">
                <span>
                  <strong>Custo:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceActions))}
                  {' | '}
                  <strong>Cobrado:</ strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceCharged))}
                </span>
              </div>

              <Tabs defaultActiveKey="1">
                {renderTabs(action ? action.split('|') : [], record)}
              </Tabs>
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

        {ModalItens(modalTitle, isModalOpen, closeModal, modalData, getColorForTag, columns)}
      </>
    );
  };

export default OperationsTable;






