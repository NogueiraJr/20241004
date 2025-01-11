import React, { useState } from "react";
import { Modal, Table, Steps } from "antd";
import { CalendarOutlined, SkinOutlined, UploadOutlined, RollbackOutlined, CalculatorOutlined, FileDoneOutlined, UnorderedListOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { userActions } from "../../../fields/Operacional/userActions-json";
import { userActionsItems } from '../../../fields/Operacional/userActionsItems-json';
import moment from "moment";
import ActionMenu from './components/ActionMenu';
import ItemsModal from './components/ItemsModal';
import ActionIcons from './components/ActionIcons';
import { createSystemOverrides, defaultActionMap } from './constants';
const UserOperationsDetails: React.FC<{
  actions: string[];
  system: string;
  userOperationId: string;
  openModal: (moment: string) => void;
  openGoogleMaps: () => void;
}> = ({ actions, system, userOperationId, openModal, openGoogleMaps }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState<any[]>([]);

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
    setModalTitle(action === "Itens" ? "Itens" : action.charAt(0).toUpperCase() + action.slice(1));
    
    if (action === "Itens") {
      const userAction = userActions.find(action => 
        action.actionId === actionId && 
        action.userOperationId === userOperationId && 
        action.id === userActionId
      );
      
      const products = userActionsItems.filter(item => item.userActionId === userAction?.id);
      setModalData(formatItemsData(products));
    } else {
      setModalData(formatActionData(actionId));
    }
    setModalOpen(true);
  };

  const formatItemsData = (products: any[]) => {
    const groupedData = products.reduce((acc: any, product: any) => {
      const { productTypeId, name, description, quantity, price, tags } = product;
      if (!acc[productTypeId]) {
        acc[productTypeId] = [];
      }
      acc[productTypeId].push({ key: product.id, name, description, quantity, price, tags: tags || [] });
      return acc;
    }, {});

    return Object.keys(groupedData).map((productTypeId) => ({
      key: productTypeId,
      productTypeId,
      products: groupedData[productTypeId],
    }));
  };

  const formatActionData = (actionId: string) => {
    return userActions
      .filter(userAction => 
        userAction.userOperationId === userOperationId && 
        userAction.actionId.toLocaleLowerCase().trim() === actionId.toLocaleLowerCase().trim()
      )
      .map(userAction => ({
        key: userAction.id,
        description: userAction.description,
        scheduledAt: userAction.scheduledAt,
        action: userAction.actionId,
        executedAt: userAction.executedAt,
        finishedAt: userAction.finishedAt,
      }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData([]);
  };

  const actionMap = { 
    ...defaultActionMap, 
    ...createSystemOverrides(openModal, openGoogleMaps)[system] 
  };

  const columns = [
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Quando", dataIndex: "scheduledAt", key: "scheduledAt" },
    {
      title: "Ações",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => actionMap[record.action]?.icon || null,    },
  ];

  return (
    <>
      <ActionIcons actions={actions} actionMap={actionMap} />
      
      <ItemsModal 
        isVisible={isModalOpen && modalTitle === "Itens"}
        onClose={closeModal}
        modalData={modalData}
        title={modalTitle}
      />

      <Modal
        title={modalTitle}
        visible={isModalOpen && modalTitle !== "Itens"}
        onCancel={closeModal}
        footer={null}
        style={{ top: 100 }}
        bodyStyle={{ maxHeight: '50vh', overflowY: 'auto' }}
      >
        <Table dataSource={modalData} columns={columns} pagination={false} />
      </Modal>
    </>
  );
};

export default UserOperationsDetails;