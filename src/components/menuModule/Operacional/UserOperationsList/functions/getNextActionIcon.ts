import { SkinOutlined, UploadOutlined, RollbackOutlined, CheckCircleOutlined, UnorderedListOutlined, CalculatorOutlined, FileDoneOutlined } from "@ant-design/icons";

const getNextActionIcon = (
  actionId: string,
  executedAt: string | null,
  finishedAt: string | null,
  getActionMenuExecute: (actions: any[]) => JSX.Element,
  showConfirm: (message: string) => void,
  handleActionClick: (action: string, actionId: string, userActionId?: string) => void,
  userActionId?: string
) => {
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
    case "sysOficinaCarro_conveniencia":
      return getActionMenuExecute([
        { icon: FileDoneOutlined, color: 'green', text: 'Executar', action: () => showConfirm("Executar"), disabled: isExecuted },
        { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar"), disabled: isFinished },
      ]);
    default:
      return null;
  };

};

export default getNextActionIcon;
