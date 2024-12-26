import React, { useState } from "react";
import { Tooltip, Modal, Table, Button } from "antd";
import { CalendarOutlined, SkinOutlined, UploadOutlined, RollbackOutlined, CalculatorOutlined, FileDoneOutlined, CarOutlined, ExportOutlined, ImportOutlined, LoginOutlined, LogoutOutlined, SearchOutlined, ToolOutlined, CheckCircleOutlined } from "@ant-design/icons";
import IconText from "./IconText";
import { userActions } from "../../../fields/Operacional/userActions-json"; // Importe o JSON
import moment from "moment"; // Importe moment.js

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
      description: (
        <Tooltip title={userAction.notes}>
          <span>{userAction.description}</span>
        </Tooltip>
      ),
      scheduledAt: moment(userAction.scheduledAt).format("DD/MM/YYYY HH:mm"), // Formate scheduledAt
      action: userAction.actionId,
    }));
    setModalData(filteredData);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData([]);
  };

  const iconStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' };

  const getNextActionIcon = (actionId: string) => {
    switch (actionId) {
      case "sysLocacaoRoupa_reservar":
        return (
          <Tooltip title="Provar">
            <div style={iconStyle} onClick={() => console.log("Provar")}>
              <SkinOutlined style={{ color: 'green' }} />
              <div style={{ color: 'green' }}>Provar</div>
            </div>
          </Tooltip>
        );
      case "sysLocacaoRoupa_provar":
        return (
          <Tooltip title="Retirar">
            <div style={iconStyle} onClick={() => console.log("Retirar")}>
              <UploadOutlined style={{ color: 'orange' }} />
              <div style={{ color: 'orange' }}>Retirar</div>
            </div>
          </Tooltip>
        );
      case "sysLocacaoRoupa_retirar":
        return (
          <Tooltip title="Devolver">
            <div style={iconStyle} onClick={() => console.log("Devolver")}>
              <RollbackOutlined style={{ color: 'red' }} />
              <div style={{ color: 'red' }}>Devolver</div>
            </div>
          </Tooltip>
        );
      case "sysLocacaoRoupa_devolver":
        return (
          <Tooltip title="Finalizar">
            <div style={iconStyle} onClick={() => console.log("Fnalizar")}>
              <CheckCircleOutlined style={{ color: 'green' }} />
              <div style={{ color: 'green' }}>Finalizar</div>
            </div>
          </Tooltip>
        );
      case "sysOficinaCarro_diagnosticar":
        return (
          <Tooltip title="Orçar">
            <div style={iconStyle} onClick={() => console.log("Orçar")}>
              <CalculatorOutlined style={{ color: 'blue' }} />
              <div style={{ color: 'blue' }}>Orçar</div>
            </div>
          </Tooltip>
        );
      case "sysOficinaCarro_orcar":
        return (
          <Tooltip title="Executar">
            <div style={iconStyle} onClick={() => console.log("Executar")}>
              <FileDoneOutlined style={{ color: 'green' }} />
              <div style={{ color: 'green' }}>Executar</div>
            </div>
          </Tooltip>
        );
      case "sysOficinaCarro_executar":
        return (
          <Tooltip title="Finalizar">
            <div style={iconStyle} onClick={() => console.log("Fnalizar")}>
              <CheckCircleOutlined style={{ color: 'green' }} />
              <div style={{ color: 'green' }}>Finalizar</div>
            </div>
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const columns = [
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Quando", dataIndex: "scheduledAt", key: "scheduledAt" },
    {
      title: "Ação",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => getNextActionIcon(record.action),
    },
  ];

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
      action: () => handleActionClick("Reservas", "sysLocacaoRoupa_reservar"),
    },
    provar: {
      icon: SkinOutlined,
      text: "Provas",
      tooltip: "Exibe as Provas",
      color: "green",
      action: () => handleActionClick("Provas", "sysLocacaoRoupa_provar"),
    },
    retirar: {
      icon: UploadOutlined,
      text: "Retiradas",
      tooltip: "Exibe as Retiradas",
      color: "orange",
      action: () => handleActionClick("Retiradas", "sysLocacaoRoupa_retirar"),
    },
    devolver: {
      icon: RollbackOutlined,
      text: "Devoluções",
      tooltip: "Exibe as Devoluções",
      color: "red",
      action: () => handleActionClick("Devoluções", "sysLocacaoRoupa_devolver"),
    },
    orcar: {
      icon: CalculatorOutlined,
      text: "Orçamento",
      tooltip: "Orçamento realizado",
      color: "blue",
      action: () => handleActionClick("Orçamentos", "sysOficinaCarro_orcar"),
    },
    executar: {
      icon: FileDoneOutlined,
      text: "Serviços",
      tooltip: "Execução do Serviço",
      color: "green",
      action: () => handleActionClick("Execuções", "sysOficinaCarro_executar"),
    },
    diagnostico: {
      icon: SearchOutlined,
      text: "Diagnósticos",
      tooltip: "Análise e avaliação",
      color: "green",
      action: () => handleActionClick("Diagnósticos", "sysOficinaCarro_diagnosticar"),
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
        action: () => handleActionClick("Execuções", "sysOficinaCarro_executar"),
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
            style={{ cursor: 'pointer' }}
          />
        ) : null;
      })}

      <Modal
        title={modalTitle}
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        style={{ top: 100 }}
        bodyStyle={{
          maxHeight: '50vh',
          overflowY: 'auto',
        }}
>
        <Table dataSource={modalData} columns={columns} pagination={false} />
      </Modal>
    </>
  );
};

export default ActionDetails;
