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
import { userActions } from "../../../fields/Operacional/userActions-json"; // Importe o JSON

const ActionDetails: React.FC<{
  actions: string[];
  system: string;
  userOperationId: string;
  openModal: (moment: string) => void;
}> = ({ actions, system, userOperationId, openModal }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState<any[]>([]);

  const handleActionClick = (action: string, actionId: string) => {
    console.log(`Action: ${action} - ActionId: ${actionId} - UserOperationId: ${userOperationId}`);
    setModalTitle(action.charAt(0).toUpperCase() + action.slice(1));
    const filteredData = userActions.filter(
      (userAction) => userAction.userOperationId === userOperationId && userAction.actionId.toLocaleLowerCase().trim() === actionId.toLocaleLowerCase().trim()
    ).map((userAction) => ({
      key: userAction.id,
      description: userAction.description,
      notes: userAction.notes,
      scheduledAt: userAction.scheduledAt,
    }));
    setModalData(filteredData);
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
      action: () => handleActionClick("Reservar", "sysLocacaoRoupa_reservar"),
    },
    provar: {
      icon: SkinOutlined,
      text: "Provas",
      tooltip: "Exibe as Provas",
      color: "green",
      action: () => handleActionClick("Provar", "sysLocacaoRoupa_provar"),
    },
    retirar: {
      icon: UploadOutlined,
      text: "Retiradas",
      tooltip: "Exibe as Retiradas",
      color: "orange",
      action: () => handleActionClick("Retirar", "sysLocacaoRoupa_retirar"),
    },
    devolver: {
      icon: RollbackOutlined,
      text: "Devoluções",
      tooltip: "Exibe as Devoluções",
      color: "red",
      action: () => handleActionClick("Devolver", "sysLocacaoRoupa_devolver"),
    },
    orcar: {
      icon: CalculatorOutlined,
      text: "Orçamento",
      tooltip: "Orçamento realizado",
      color: "blue",
      action: () => handleActionClick("Orçar", "sysOficinaCarro_orcar"),
    },
    executar: {
      icon: FileDoneOutlined,
      text: "Serviço",
      tooltip: "Execução do Serviço",
      color: "green",
      action: () => handleActionClick("Executar", "sysOficinaCarro_executar"),
    },
    diagnostico: {
      icon: SearchOutlined,
      text: "Diagnóstico",
      tooltip: "Análise e avaliação",
      color: "green",
      action: () => handleActionClick("Diagnóstico", "sysOficinaCarro_diagnosticar"),
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
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Notas", dataIndex: "notes", key: "notes" },
    { title: "Agendado para", dataIndex: "scheduledAt", key: "scheduledAt" },
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
