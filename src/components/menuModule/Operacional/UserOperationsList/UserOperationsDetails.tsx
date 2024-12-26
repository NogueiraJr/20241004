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
  openModal: (moment: string) => void;
}> = ({ actions, system, openModal }) => {
  const [isDevolverModalOpen, setDevolverModalOpen] = useState(false);
  const [userOperationId, setUserOperationId] = useState<string | null>(null);

  const handleDevolverClick = (id: string) => {
    setUserOperationId(id);
    setDevolverModalOpen(true);
  };

  const closeDevolverModal = () => {
    setDevolverModalOpen(false);
    setUserOperationId(null);
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
    },
    provar: {
      icon: SkinOutlined,
      text: "Provas",
      tooltip: "Exibe as Provas",
      color: "green",
    },
    retirar: {
      icon: UploadOutlined,
      text: "Retiradas",
      tooltip: "Exibe as Retiradas",
      color: "orange",
    },
    devolver: {
      icon: RollbackOutlined,
      text: "Devoluções",
      tooltip: "Exibe as Devoluções",
      color: "red",
      action: () => handleDevolverClick("12345"), // Exemplo de ID de operação
    },
    levar: {
      icon: ExportOutlined,
      text: "Levar",
      tooltip: "Levar no Cliente",
      color: "purple",
      action: () => openGoogleMaps(),
    },
    buscar: {
      icon: ImportOutlined,
      text: "Buscar",
      tooltip: "Buscar no Cliente",
      color: "blue",
      action: () => openGoogleMaps(),
    },
    orcar: {
      icon: CalculatorOutlined,
      text: "Orçamento",
      tooltip: "Orçamento realizado",
      color: "blue",
    },
    executar: {
      icon: FileDoneOutlined,
      text: "Serviço",
      tooltip: "Execução do Serviço",
      color: "green",
    },
    checkin: {
      icon: LoginOutlined,
      text: "Check-in",
      tooltip: "Verificação de Entrada",
      color: "blue",
      action: () => openModal("in"),
    },
    checkout: {
      icon: LogoutOutlined,
      text: "Check-out",
      tooltip: "Verificação de Saída",
      color: "green",
      action: () => openModal("out"),
    },
    diagnostico: {
      icon: SearchOutlined,
      text: "Diagnóstico",
      tooltip: "Análise e avaliação",
      color: "green",
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

  const devolverTableData = [
    { key: "1", name: "Devolução da Locação do Filho do João", phone: "(11) 99999-9999" },
    { key: "2", name: "Devolução da Locação da Sobrinha do João", phone: "(21) 98888-8888" },
  ];

  const devolverTableColumns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Telefone", dataIndex: "phone", key: "phone" },
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
        title="Detalhes da Devolução"
        visible={isDevolverModalOpen}
        onCancel={closeDevolverModal}
        footer={null}
      >
        <Table
          dataSource={devolverTableData}
          columns={devolverTableColumns}
          pagination={false}
        />
      </Modal>
    </>
  );
};

export default ActionDetails;
