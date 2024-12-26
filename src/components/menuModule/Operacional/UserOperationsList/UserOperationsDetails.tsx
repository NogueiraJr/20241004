import {
  CalculatorOutlined,
  CalendarOutlined,
  CarOutlined,
  ExportOutlined,
  FileDoneOutlined,
  ImportOutlined,
  LoginOutlined,
  LogoutOutlined,
  RollbackOutlined,
  SearchOutlined,
  SkinOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Tooltip, Modal, Table } from "antd";
import React, { useState } from "react";
import IconText from "./IconText";

const ActionDetails: React.FC<{
  actions: string[];
  system: string;
  userOperationId: string;
  openModal: (moment: string) => void;
}> = ({ actions, system, userOperationId, openModal }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState<any[]>([]);

  const handleActionClick = (action: string, data: any[]) => {
    setModalTitle(action.charAt(0).toUpperCase() + action.slice(1));
    setModalData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData([]);
  };

  const defaultActionMap: Record<
    string,
    {
      icon: React.ComponentType<any>;
      text: string;
      tooltip: string;
      color: string;
      action?: () => void;
    }
  > = {
    reservar: {
      icon: CalendarOutlined,
      text: "Reservas",
      tooltip: "Exibe as Reservas",
      color: "blue",
      action: () => handleActionClick("Reservar", [
        { key: "1", name: "Cliente A", phone: "(11) 12345-6789", userOperationId },
        { key: "2", name: "Cliente B", phone: "(21) 98765-4321", userOperationId },
      ]),
    },
    provar: {
      icon: SkinOutlined,
      text: "Provas",
      tooltip: "Exibe as Provas",
      color: "green",
      action: () => handleActionClick("Provar", [
        { key: "1", name: "Cliente X", phone: "(31) 99887-7766", userOperationId },
        { key: "2", name: "Cliente Y", phone: "(41) 88776-6655", userOperationId },
      ]),
    },
    retirar: {
      icon: UploadOutlined,
      text: "Retiradas",
      tooltip: "Exibe as Retiradas",
      color: "orange",
      action: () => handleActionClick("Retirar", [
        { key: "1", name: "Cliente C", phone: "(51) 33445-6677", userOperationId },
        { key: "2", name: "Cliente D", phone: "(61) 22334-5566", userOperationId },
      ]),
    },
    devolver: {
      icon: RollbackOutlined,
      text: "Devoluções",
      tooltip: "Exibe as Devoluções",
      color: "red",
      action: () => handleActionClick("Devolver", [
        { key: "1", name: "João Silva", phone: "(11) 99999-9999", userOperationId },
        { key: "2", name: "Maria Oliveira", phone: "(21) 98888-8888", userOperationId },
      ]),
    },
    orcar: {
      icon: CalculatorOutlined,
      text: "Orçamento",
      tooltip: "Orçamento realizado",
      color: "blue",
      action: () => handleActionClick("Orçar", [
        { key: "1", name: "Cliente E", phone: "(71) 55667-7788", userOperationId },
        { key: "2", name: "Cliente F", phone: "(81) 44556-6677", userOperationId },
      ]),
    },
    executar: {
      icon: FileDoneOutlined,
      text: "Serviço",
      tooltip: "Execução do Serviço",
      color: "green",
      action: () => handleActionClick("Executar", [
        { key: "1", name: "Cliente G", phone: "(91) 33445-5566", userOperationId },
        { key: "2", name: "Cliente H", phone: "(31) 22334-4455", userOperationId },
      ]),
    },
    diagnostico: {
      icon: SearchOutlined,
      text: "Diagnóstico",
      tooltip: "Análise e avaliação",
      color: "green",
      action: () => handleActionClick("Diagnóstico", [
        { key: "1", name: "Cliente I", phone: "(51) 99887-7766", userOperationId },
        { key: "2", name: "Cliente J", phone: "(61) 88776-6655", userOperationId },
      ]),
    },
  };

  const openGoogleMaps = () => {
    const latitude = -23.1794;
    const longitude = -45.8869;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const systemOverrides: Record<string, Partial<typeof defaultActionMap>> = {
    sysOficinaCarro: {
      executar: {
        icon: CarOutlined,
        text: "Serviços",
        tooltip: "Execução de Serviços Automotivos",
        color: "green",
      },
    },
    sysLocacaoRoupa: {
      checkin: {
        icon: LoginOutlined,
        text: "Check-in",
        tooltip: "Verificação de Retorno do Cliente",
        color: "blue",
        action: () => openModal("in"),
      },
      checkout: {
        icon: LogoutOutlined,
        text: "Check-out",
        tooltip: "Verificação de Entrega para o Cliente",
        color: "purple",
        action: () => openModal("out"),
      },
    },
  };

  const actionMap = { ...defaultActionMap, ...systemOverrides[system] };

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Telefone", dataIndex: "phone", key: "phone" },
    { title: "Operação", dataIndex: "userOperationId", key: "userOperationId" },
  ];

  return (
    <>
      {actions.map((action, index) => {
        const details = actionMap[action];
        return details ? (
          <IconText
            key={index}
            icon={details.icon}
            text={details.text}
            tooltip={details.tooltip}
            color={details.color}
            onClick={details.action}
          />
        ) : null;
      })}

      <Modal
        title={modalTitle}
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Table dataSource={modalData} columns={columns} pagination={false} />
      </Modal>
    </>
  );
};

export default ActionDetails;
