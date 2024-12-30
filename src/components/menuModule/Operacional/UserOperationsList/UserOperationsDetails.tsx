import React, { useState } from "react";
import { Tooltip, Modal, Table, Button, Popover, Collapse, List, Tabs } from "antd";
import { CalendarOutlined, SkinOutlined, UploadOutlined, RollbackOutlined, CalculatorOutlined, FileDoneOutlined, CarOutlined, ExportOutlined, ImportOutlined, LoginOutlined, LogoutOutlined, SearchOutlined, ToolOutlined, CheckCircleOutlined, UnorderedListOutlined, InfoCircleOutlined } from "@ant-design/icons";
import IconText from "./IconText";
import { userActions } from "../../../fields/Operacional/userActions-json"; // Importe o JSON
import { produtosOficinaCarro } from '../../../fields/Dados/sysOficinaCarro/produtosOficinaCarro-json';
import { produtosLocacaoRoupa } from '../../../fields/Dados/sysLocacaoRoupa/produtosLocacaoRoupa-json';
import moment from "moment"; // Importe moment.js

const { Panel } = Collapse;
const { TabPane } = Tabs;

const ActionDetails: React.FC<{
  actions: string[];
  system: string;
  userOperationId: string;
  openModal: (moment: string) => void;
}> = ({ actions, system, userOperationId, openModal }) => {
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

  const handleActionClick = (action: string, actionId: string) => {
    console.log(`Action: ${action} - ActionId: ${actionId} - UserOperationId: ${userOperationId}`);
    setModalTitle(action.charAt(0).toUpperCase() + action.slice(1));
    
    if (action === "Detalhes") {
      const products = system === "sysOficinaCarro" ? produtosOficinaCarro : produtosLocacaoRoupa;
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
    }
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
        return actionMenuExecute([
          { icon: SkinOutlined, color: 'green', text: 'Provar', action: () => showConfirm("Provar") },
          { icon: UploadOutlined, color: 'orange', text: 'Retirar', action: () => showConfirm("Retirar") },
          { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar") },
          { icon: InfoCircleOutlined, color: 'blue', text: 'Detalhes', action: () => handleActionClick("Detalhes", actionId) }
        ]);
      case "sysLocacaoRoupa_provar":
        return actionMenuExecute([
          { icon: UploadOutlined, color: 'orange', text: 'Retirar', action: () => showConfirm("Retirar") },
          { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar") },
          { icon: InfoCircleOutlined, color: 'blue', text: 'Detalhes', action: () => handleActionClick("Detalhes", actionId) }
        ]);
      case "sysLocacaoRoupa_retirar":
        return actionMenuExecute([
          { icon: RollbackOutlined, color: 'red', text: 'Devolver', action: () => showConfirm("Devolver") },
          { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar") },
          { icon: InfoCircleOutlined, color: 'blue', text: 'Detalhes', action: () => handleActionClick("Detalhes", actionId) }
        ]);
      case "sysLocacaoRoupa_devolver":
        return actionMenuExecute([
          { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar") },
          { icon: InfoCircleOutlined, color: 'blue', text: 'Detalhes', action: () => handleActionClick("Detalhes", actionId) }
        ]);
      case "sysOficinaCarro_diagnosticar":
        return actionMenuExecute([
          { icon: CalculatorOutlined, color: 'blue', text: 'Orçar', action: () => showConfirm("Orçar") },
          { icon: FileDoneOutlined, color: 'green', text: 'Executar', action: () => showConfirm("Executar") },
          { icon: InfoCircleOutlined, color: 'blue', text: 'Detalhes', action: () => handleActionClick("Detalhes", actionId) }
        ]);
      case "sysOficinaCarro_orcar":
        return actionMenuExecute([
          { icon: FileDoneOutlined, color: 'green', text: 'Executar', action: () => showConfirm("Executar") },
          { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar") },
          { icon: InfoCircleOutlined, color: 'blue', text: 'Detalhes', action: () => handleActionClick("Detalhes", actionId) }
        ]);
      case "sysOficinaCarro_executar":
        return actionMenuExecute([
          { icon: CheckCircleOutlined, color: 'green', text: 'Finalizar', action: () => showConfirm("Finalizar") },
          { icon: InfoCircleOutlined, color: 'blue', text: 'Detalhes', action: () => handleActionClick("Detalhes", actionId) }
        ]);
      default:
        return null;
    }
  };

  function actionMenuExecute(actions: { icon: React.ComponentType<any>; color: string; text: string; action: () => void }[]) {
    return (
      <Popover
        content={
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {actions.map((action, index) => (
              <React.Fragment key={index}>
                {action.text === 'Detalhes' && <div style={{ borderLeft: '1px solid #ccc', height: '24px', margin: '0 10px' }} />}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={action.action}>
                  {React.createElement(action.icon, { style: { color: action.color } })}
                  <div style={{ color: action.color }}>{action.text}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        }
        title="Ações"
        trigger="click"
        placement="bottomRight" // Preferencialmente abrir abaixo do ícone inicial, alinhado à direita
      >
        <Tooltip title="Ações Disponíveis">
          <div style={iconStyle}>
            <UnorderedListOutlined style={{ color: 'blue' }} />
            <div style={{ color: 'blue' }}>Ações</div>
          </div>
        </Tooltip>
      </Popover>
    );
  }

  const columns = [
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Quando", dataIndex: "scheduledAt", key: "scheduledAt" },
    {
      title: "Ações",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => getNextActionIcon(record.action),
    },
  ];

  const productColumns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Quantidade", dataIndex: "quantity", key: "quantity" },
    { title: "Preço", dataIndex: "price", key: "price" },
    { title: "Tags", dataIndex: "tags", key: "tags" },
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
        {modalTitle === "Detalhes" ? (
          <Collapse accordion>
            {modalData.map((group: any) => (
              <Panel header={group.productTypeId} key={group.key}>
                <List
                  itemLayout="horizontal"
                  dataSource={group.products}
                  renderItem={(product: any) => (
                    <List.Item>
                      <Collapse>
                        <Panel header={product.name} key={product.key}>
                          <Tabs defaultActiveKey="1">
                            <TabPane tab="Descrição" key="1">
                              {product.description}
                            </TabPane>
                            <TabPane tab="Detalhes" key="2">
                              <p><strong>Quantidade:</strong> {product.quantity}</p>
                              <p><strong>Preço:</strong> {product.price}</p>
                              <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
                            </TabPane>
                          </Tabs>
                        </Panel>
                      </Collapse>
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Table dataSource={modalData} columns={columns} pagination={false} />
        )}
      </Modal>
    </>
  );
};

export default ActionDetails;
