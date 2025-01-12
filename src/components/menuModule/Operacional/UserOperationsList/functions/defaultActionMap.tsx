import { CalendarOutlined, SkinOutlined, UploadOutlined, RollbackOutlined, CalculatorOutlined, FileDoneOutlined, SearchOutlined } from "@ant-design/icons";

function DefaultActionMap(): Record<string, { icon: React.ComponentType<any>; text: string; tooltip: string; color: string; actionId: string; }> {
    return {
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
        text: "Orçamentos",
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
  }

  export default DefaultActionMap;