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
import getColumnsForTab from "./functions/getColumnsForTab";
import showConfirm from "./functions/showConfirm";
import tableOperations from "./functions/tableOperations";
import getWhenOperation from "./functions/getWhenOperation";
import getActionMenuExecute from "./functions/getActionMenuExecute";

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

        const columnsForTab = getColumnsForTab(getColorForTag, getStepStatus, getStepIconColor, getNextActionIcon);
        

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
              const getStepIconColor = (date: string | undefined, color: string) => date ? color : 'gray';


              return {
                key: userAction.id,
                description: userAction.description,
                tags: userAction.tags,
                notes: userAction.notes,
                scheduledAt: (
                  getWhenOperation(userAction, getStepStatus, getStepIconColor)
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

        function getNextActionIcon(actionId: string, executedAt: string | null, finishedAt: string | null, userActionId?: string) {
          const isExecuted = !!executedAt;
          const isFinished = !!finishedAt;

          switch (actionId) {
            case "sysLocacaoRoupa_reservar":
              return getActionMenuExecute([
                { icon: SkinOutlined, color: 'green', text: 'Provar', action: () => showConfirm("Provar") },
                { icon: UploadOutlined, color: 'orange', text: 'Retirar', action: () => showConfirm("Retirar") },
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysLocacaoRoupa_provar":
              return getActionMenuExecute([
                { icon: UploadOutlined, color: 'orange', text: 'Retirar', action: () => showConfirm("Retirar") },
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysLocacaoRoupa_retirar":
              return getActionMenuExecute([
                { icon: RollbackOutlined, color: 'red', text: 'Devolver', action: () => showConfirm("Devolver") },
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysLocacaoRoupa_devolver":
              return getActionMenuExecute([
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysOficinaCarro_diagnosticar":
              return getActionMenuExecute([
                { icon: CalculatorOutlined, color: 'blue', text: 'Orçar', action: () => showConfirm("Orçar") },
                { icon: FileDoneOutlined, color: 'green', text: 'Executar', action: () => showConfirm("Executar"), disabled: isExecuted },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysOficinaCarro_orcar":
              return getActionMenuExecute([
                { icon: FileDoneOutlined, color: 'green', text: 'Executar', action: () => showConfirm("Executar"), disabled: isExecuted },
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            case "sysOficinaCarro_executar":
              return getActionMenuExecute([
                { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
                { icon: UnorderedListOutlined, color: 'blue', text: 'Itens', action: () => handleActionClick("Itens", actionId, userActionId) }
              ]);
            default:
              return null;
          };
        }

         return (
          <Tabs.TabPane tab={<span>{details.text}</span>} key={details.text}>
            <Table showHeader={false} dataSource={filteredData} columns={columnsForTab} pagination={false} />
          </Tabs.TabPane>
        );

        
      });
    };

    return (
      <>
        {FilterTop({ navigate, setStatusFilter, setTagFilter, operations })}
        {tableOperations(columns, filteredData, renderTabs, action, expandedRowKeys, handleExpand)}
        {ModalItens(modalTitle, isModalOpen, closeModal, modalData, getColorForTag, columns)}
      </>
    );
  };

export default OperationsTable;










