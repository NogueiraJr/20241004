import { EditOutlined, DeleteOutlined, CheckCircleOutlined, ImportOutlined, ExportOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";

export const defaultActionMap = {
  editar: {
    icon: EditOutlined,
    text: "Editar",
    tooltip: "Edita o Item",
    color: "green",
  },
  apagar: {
    icon: DeleteOutlined,
    text: "Apagar",
    tooltip: "Apaga o Item",
    color: "red",
  },
  ativo: {
    icon: CheckCircleOutlined,
    text: "Ativo",
    tooltip: "Ativa / Desativa o Item",
    color: "orange",
  },
};

export const systemOverrides = {
  sysOficinaCarro: {
    buscar: {
      icon: ImportOutlined,
      text: "Buscar",
      tooltip: "Buscar no Cliente",
      color: "blue",
      action: () => openGoogleMaps(),
    },
    checkin: {
      icon: LoginOutlined,
      text: "Check-in",
      tooltip: "Verificação no Início do Atendimento",
      color: "blue",
      action: () => openModal("in"),
    },
    checkout: {
      icon: LogoutOutlined,
      text: "Check-out",
      tooltip: "Verificação no Fim do Atendimento",
      color: "purple",
      action: () => openModal("out"),
    },
    levar: {
      icon: ExportOutlined,
      text: "Levar",
      tooltip: "Devolver para o Cliente",
      color: "purple",
      action: () => openGoogleMaps(),
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
    }
  },
};

const openGoogleMaps = () => {
  const latitude = -23.1794;
  const longitude = -45.8869;
  const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(url, "_blank");
};

const openModal = (type: string) => {
  // This function needs to be implemented or passed as a prop
  console.log(`Opening modal for ${type}`);
};
