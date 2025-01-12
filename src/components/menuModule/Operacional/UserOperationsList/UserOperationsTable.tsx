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

import handleActionClick from "./functions/handleActionClick";
import getNextActionIcon from "./functions/getNextActionIcon";

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
    
        const columnsForTab = getColumnsForTab(getColorForTag, getStepStatus, getStepIconColor, (actionId, executedAt, finishedAt, userActionId) =>
          getNextActionIcon(
            actionId,
            executedAt,
            finishedAt,
            getActionMenuExecute,
            showConfirm,
            (action, actionId, userActionId) =>
              handleActionClick(action, actionId, record, setModalTitle, setModalData, setModalOpen, userActions, userActionsItems, getColorForTag, userActionId),
            userActionId
          )
        );
    
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










